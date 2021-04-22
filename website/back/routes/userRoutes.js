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
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById)
userRouter.get('/profile', getUserProfile)
userRouter.get('/profile/bots', getUsersBotsById)
userRouter.get('/profile/bots:id', getUsersOneBotById)
userRouter.put('/profile', enterApiToken)

export default userRouter;