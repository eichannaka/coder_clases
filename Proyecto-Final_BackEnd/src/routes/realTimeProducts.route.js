import { Router } from "express";
import { getProductRealTime } from "../controller/realTimeProducts.controller.js";
const router = Router();

router.get("/", getProductRealTime);

export default router;
