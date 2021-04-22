import express from 'express'
const setupRouter = express.Router()

import { admin, dev } from '../controllers/setupController'

setupRouter.post('/admin', admin)
setupRouter.post('/dev', dev)