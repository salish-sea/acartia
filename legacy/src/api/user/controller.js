import { success, notFound } from '../../services/response/'
import { User } from '.'
import UserToken from './token.model'
import { ec as EC } from 'elliptic'
import { toEthereumAddress } from 'did-jwt'
import randomString from 'randomstring'
import FormData from 'form-data'
import fetch from 'node-fetch'
import fs from 'fs'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) => users.map((user) => user.view(true)))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showUserRequests = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) => users.filter((user) => (user.isApproved == false) ? user.view() : false))
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) => {
  // Create a key pair
  try {
    const sepCurve = new EC('secp256k1')
    const userKey = sepCurve.genKeyPair()

    // Generate user DID and Primary key
    const userDid = `did:ethr:${toEthereumAddress(userKey.getPublic('hex'))}`
    const userPk = userKey.getPrivate('hex')
    body.did = userDid
    body.pKey = userPk
    console.info('body:', body)
  } catch (e) {
    console.error('There was an error adding the user: ', e)
  }
  User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch((err) => {
      console.error(`There was an error adding a user: ${err}`)
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })
}

const generateToken = (userId, name) => {
  const token = randomString.generate(18)
  const userToken = new UserToken()
  userToken.user = userId
  userToken.name = name
  userToken.token = token
  return userToken.save()
}

export const createToken = async ({ bodymen: { body }, params, user }, res, next) => {
  try {
    const { name } = body
    const { id } = params
    const resToken = await generateToken(id, name)
    res.json(resToken)
  } catch (e) {
    console.error('There was an error creating a token: ', e)
    res.status(500)
  }
}

// This function is largely based on IPFS add from uportlandia/node_scripts/create_issuers.js
const uploadIPFS = async (filepath) => {
  const logoImage = fs.readFileSync(filepath)
  try {
    const uploadForm = new FormData()
    uploadForm.append('file', logoImage)
    const ipfsRes = await fetch('https://ipfs.infura.io:5001/api/v0/add?pin=true', {
      method: 'post',
      body: uploadForm
    })
    const hash = (await ipfsRes.json()).Hash
    return `/ipfs/${hash}`
  } catch (e) {
    console.error(`There was an error uploading to ipfs: ${e}`)
    throw e
  }
}

export const updateProfile = async ({ bodymen: { body }, params, user }, res, next) => {
  try {
    const { name, logoFile, website, fileName } = body
    const tempFile = logoFile.replace(/^data:image\/\w+;base64,/, '')
    const buffImg = Buffer.from(tempFile, 'base64')
    const filePath = `tmp/${fileName}`
    await fs.writeFile(filePath, buffImg, (err) => {
      if (err) { console.log(err) } else {
        console.log('Temporary file written successfully\n')
      }
    })
    const { id } = params
    const user = await User.findById(id)
    const ipfsUrl = await uploadIPFS(filePath)
    await fs.unlink(filePath, (err) => {
      if (err) { console.log(err) } else {
        console.log('Temporary file deleted\n')
      }
    })
    console.log(ipfsUrl)
    user.name = name
    user.logo = logoFile
    user.ipfsLogo = ipfsUrl
    user.website = website
    await user.save()
    res.json({ name: user.name, website: user.website, logoFile: user.logo, ipfsLogo: user.ipfsLogo })
  } catch (e) {
    console.error('There was an error updating a profile: ', e)
    res.status(500)
  }
}

export const showTokens = ({ params }, res, next) =>
  UserToken.find({
    user: params.id
  })
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const deleteToken = ({ params }, res, next) =>
  UserToken.findById(params.id)
    .then(notFound(res))
    .then((userToken) => userToken ? userToken.remove() : null)
    .then(success(res, 204))
    .catch(next)
