import express, { Router } from 'express'
import path from 'path'
import { loadApi, conserveApi } from './partner-data/spotter-api'
import { csLoadSpreadsheet } from './partner-data/citizen-science-api'
import { omLoadSpreadsheet } from './partner-data/orca-map-api'
import user from './user'
import auth from './auth'
import emailServer from './email-server'
import passwordReset from './password-reset'
import dataIngestion from './data-ingestion'
import cors from 'cors'
import { token } from '../services/passport/index'
import cron from 'node-cron'
import app from '../app'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

router.route('/')
  .get((req, res, next) => {
    res.send('Hello')
  })

router.use('/docs', express.static('src/docs'))
/**
 *----- USER AND AUTHENTICATION ROUTING METHODS -----
 */

//  CORS Whitelist prod and local frontend URLs for the application
const corsWhitelist = {
  origin: ['https://acartia.io', 'http://localhost:8080']
}

router.use('/v1/users', cors(corsWhitelist), user)
router.use('/v1/auth', cors(corsWhitelist), auth)
router.use('/v1/password-resets', cors(corsWhitelist), passwordReset)
router.use('/v1/sightings', cors(corsWhitelist), dataIngestion)
router.use('/v1/email', cors(corsWhitelist), emailServer)

router.get('/v1/import',
  token({ required: true, roles: ['admin'] }),
  async (req, res, next) => {
    try {
      await loadApi(conserveApi, true)
      // GOOGLE SHEETS DATA LOAD
      await omLoadSpreadsheet()
      await Promise.all(setTimeout(async () => {
        // Load data from CITIZEN SCIENCE after 5 seconds of loading the previous data
        // as Google has a maximum request calls with the same API.
        await csLoadSpreadsheet()
      }, 10000))
    } catch (e) {
      console.error(`There was an error loading the data ${e}`)
      res.sendStatus(500)
    }
  })

/**
 *----- SCHEDULED JOBS TO LOAD PARTNER-DATA INTO API -----
 */

// CRON job to pull from Spotter API every day at 12AM to extract data at the end of the day
// This has been removed as it is currently being pushed
/* cron.schedule('05 00 * * * ', () => {
  console.log('Preparing scheduled load of SPOTTER API.................')
  loadApi(conserveApi)
}) */

// CRON job to pull from Orca Map google spreadsheet every Sunday at 1AM
cron.schedule('* 22 * * *', () => {
  console.log('Preparing scheduled load of ORCA MAP....................')
  omLoadSpreadsheet()
})

// CRON job to pull from Citizen Science google spreadsheet every Sunday at 3AM
cron.schedule('* 21 * * *', () => {
  console.log('Preparing scheduled load of CITIZEN SCIENCE.............')
  csLoadSpreadsheet()
})

export default router
