import { IN_PROD, APP_HOSTNAME } from './app.js'

const {
  SMTP_HOST = 'smtp.mailtrap.io',
  SMTP_PORT = 25,
  SMTP_USERNAME = 'dffdc324953b20',
  SMTP_PASSWORD = '38e6062046547b'
} = process.env

export const SMTP_OPTIONS = {
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: IN_PROD,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD
  }
}

export const MAIL_FROM = `noreply@${APP_HOSTNAME}`