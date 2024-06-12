import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router
  .post('/check-credentials', authController.checkCredentials)
  .post('/signup', authController.signUp)
  .post('/login', authController.logIn)
  .get('/logout', authController.logOut);

export default router;
