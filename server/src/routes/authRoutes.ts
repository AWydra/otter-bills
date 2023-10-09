import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router
  .post('/signup', authController.signup)
  .post('/login', authController.login)
  .get('/logout', authController.logout);

export default router;
