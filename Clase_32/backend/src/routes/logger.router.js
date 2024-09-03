import { Router } from 'express';
import * as loggerController from '../controllers/logger.controller.js';
import { checkAuth } from '../middlewares/authJwt.js';

const router = Router();

router.get('/', [checkAuth], loggerController.loggerTest);

export default router;