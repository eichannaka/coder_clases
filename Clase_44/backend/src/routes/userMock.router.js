import * as userMockController from "../controllers/userMock.controllers.js";
import { Router } from "express";

const router = Router();

router.post('/create', userMockController.createUserMock);
router.get('/', userMockController.getUsersMock);

export default router;