import { Router } from "express";
import {testLogs} from "../controller/testLogs.controller.js"

const router = Router();

router.get("/", testLogs)

export default router;
