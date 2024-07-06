import { Router } from 'express';
import * as historyController from '../controllers/historyController';

const router = Router();

router.get('/latest', historyController.getLatestHistory);

export default router;
