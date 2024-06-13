import { Router } from 'express';
import { validate } from 'middleware/validateMiddleware';
import * as authController from '../controllers/authController';

const router = Router();

router
  .post('/check-credentials', authController.checkCredentials)
  .post('/signup', validate(authController.signUpSchema), authController.signUp)
  .post('/signin', validate(authController.signInSchema), authController.signIn)
  .get('/signout', authController.signOut);

export default router;
