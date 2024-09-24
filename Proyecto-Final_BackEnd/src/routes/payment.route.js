import { Router } from "express";
import { createCheckOut } from "../controller/payment.controller.js";
const router = Router();

router.post("/create-checkout-session", createCheckOut);
export default router;
