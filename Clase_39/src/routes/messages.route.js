import { Router } from "express";
import { getMessages } from "../controller/message.controller.js";
const router = Router();

router.get("/", getMessages);

export default router;
