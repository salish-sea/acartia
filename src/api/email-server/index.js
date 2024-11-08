import { Router } from 'express'
import { sendEmail } from './controller'
import sgMail from '@sendgrid/mail'

const router = new Router()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/',
  sendEmail)

export default router
