import { Router } from 'express';
import * as storeController from '../controllers/storeController';

const router = Router();

router.get('/', storeController.getStores);

export default router;
