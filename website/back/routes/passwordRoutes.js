import express from 'express';
const passwordRouter = express.Router();
import {
  forgot, 
  getToken,
  postToken,
  changePassword
} from '../controllers/passwordController.js';

passwordRouter.get('/forgot', forgot)
passwordRouter.get('/reset/:token', getToken)
passwordRouter.post('/reset/:token', postToken)
passwordRouter.post('/change', changePassword)

export default passwordRouter;
