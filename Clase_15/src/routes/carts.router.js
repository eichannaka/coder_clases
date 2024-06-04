import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
const router = Router();

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

router.post("/", controller.create);

router.put("/:cid/products/:pid", controller.addProduct);

router.delete("/:cid", controller.remove);

export default router;