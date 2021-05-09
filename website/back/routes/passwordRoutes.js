import express from 'express';
const passwordRouter = express.Router();
import {
  forgot, 
  passwordReset, 
  changePass
} from '../controllers/passwordController.js';``

passwordRouter.post('/forgot', forgot)
passwordRouter.post('/reset', passwordReset)
passwordRouter.post('/change', changePass)

export default passwordRouter;
