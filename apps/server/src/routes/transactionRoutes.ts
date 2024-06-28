import { Router } from 'express';
import { upload } from 'middleware/uploadMiddleware';
import * as transactionController from '../controllers/transactionController';

const router = Router();

router
  .post('/', upload.single('image[file]'), transactionController.createTransaction)
  .get('/:id', transactionController.getTransaction);

export default router;
