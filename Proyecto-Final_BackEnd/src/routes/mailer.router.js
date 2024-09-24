import { Router } from "express";
import { recoveryPassword } from "../controller/mailer.controller.js";

const router = Router();

router.post("/recovery", recoveryPassword);

export default router;
