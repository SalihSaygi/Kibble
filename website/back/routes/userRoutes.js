import express from 'express';
const userRouter = express.Router();
import {
  getUsers,
  getUserById,
  getUserProfile,
  getUsersOneBotById,
  getUsersBotsById,
  enterApiToken
} from '../controllers/userController.js';
import { ensureAuthUser } from '../middlewares/authMiddleware.js'
userRouter.use(ensureAuthUser)
//Admin Routes
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById)
userRouter.get('/:id/bots', getUsersBotsById)
userRouter.get('/:id/bots/:botId', getUsersOneBotById)
//User Routes
userRouter.get('/profile', getUserProfile)
userRouter.get('/profile/bots', getUsersBotsById)
userRouter.get('/profile/bots/:botId', getUsersOneBotById)
userRouter.put('/profile', enterApiToken)

export default userRouter;