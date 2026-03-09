import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import {
  index,
  showMe,
  show,
  create,
  update,
  updatePassword,
  destroy,
  showUserRequests,
  createToken,
  showTokens,
  deleteToken,
  updateProfile
} from './controller'
import { schema } from './model'
export User, { schema } from './model'

const router = new Router()
const { email, password, name, picture, isApproved, website, role } = schema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiPrivate
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /users/requests Retrieve current user requests
 * @apiName RetrieveCurrentUserRequests
 * @apiGroup User
 * @apiPermission admin
 * @apiPrivate
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user request User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */

router.get('/requests',
  token({ required: true, roles: ['admin'] }),
  query(),
  showUserRequests)

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPrivate
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [isApproved] if the user is approved by admin.
 * @apiParam {String=user,admin} [role=user] User's role.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  master(),
  body({ email, password, name, picture, isApproved, role }),
  create)

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [isApproved] if the user is approved by admin.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, picture, isApproved, role }),
  update)

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiPrivate
 * @apiParam {String} access_token User access_token.
 * @apiParam {Number} id The user id to be deleted.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

/**
 * @api {post} /users/:id/tokens Create user token
 * @apiName CreateUserToken
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} [name] name of token.
 * @apiParam {Number} id user id
 * @apiSuccess (Success 201) {Object} user token
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 */
router.post('/:id/tokens',
  token({ required: true }),
  body({ name }),
  createToken)

/**
 * @api {post} /users/:id/profile Create/update user profile
 * @apiName CreateUserProfile
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} [name] Contributor name.
 * @apiParam {String} [website] Contributor website.
 * @apiParam {String} [logoFile] Base64 of contributor logo.
 * @apiParam {Number} id user id
 * @apiSuccess (Success 201) {Object} user profile
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 */
router.post('/:id/profile',
  token({ required: true }),
  body({
    name,
    website,
    logoFile: {
      type: String
    },
    fileName: {
      type: String
    }
  }),
  updateProfile)

/**
 * @api {get} /users/:id/tokens Get user tokens
 * @apiName GetUserTokens
 * @apiGroup User
 * @apiPermission master
 * @apiParam {Number} id user id
 * @apiSuccess (Success 201) {Object} user tokend
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 */
router.get('/:id/tokens',
  token({ required: true }),
  body({ name }),
  showTokens)

/**
 * @api {delete} /users/tokens/:id Delete token
 * @apiName DeleteToken
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token
 * @apiParam {String} id user token id
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Authorized access only.
 * @apiError 404 Token not found.
 */
router.delete('/tokens/:id',
  token({ required: true }),
  deleteToken)

export default router
