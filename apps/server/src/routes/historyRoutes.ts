import { Router } from 'express';
import * as historyController from '../controllers/historyController';

const router = Router();

router.get('/latest', historyController.aliasLatestHistory, historyController.getHistory);

export default router;
