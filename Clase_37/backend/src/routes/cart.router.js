import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkRoleJwt.js";
const router = Router();

router.get("/", [checkAuth], controller.getAll);

router.get("/:cid", [checkAuth], controller.getById);

router.post("/", [checkAuth, checkAdmin], controller.create);

router.put("/products/:pid", [checkAuth], controller.addProductToCart);

router.put("/:cid/products", [checkAuth], controller.updateProductQuantities);

router.delete("/:cid/products/:pid", [checkAuth, checkAdmin], controller.delProductToCart);

router.delete("/:cid", [checkAuth], controller.remove);

router.delete("/cleanCart/:cid", [checkAuth], controller.cleanCart);


export default router;