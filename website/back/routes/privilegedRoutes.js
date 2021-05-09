import express from 'express'
const privilegedRouter = express.Router()

import { deletePrivileged, findAllPrivileged, findOnePrivileged, updatePrivileged } from '../controllers/privilegedController.js'

privilegedRouter.get('/', findAllPrivileged)
privilegedRouter.get('/:id', findOnePrivileged)
privilegedRouter.put('/:id', updatePrivileged)
privilegedRouter.delete('/:id', deletePrivileged)

export default privilegedRouter