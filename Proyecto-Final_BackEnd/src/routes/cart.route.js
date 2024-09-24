import { Router } from "express";
import passport from "passport";
import {
  addProductCart,
  createCart,
  deleteAllProductsToCart,
  deleteProductToCart,
  getAllCarts,
  getCart,
  udapteAllCart,
  udapteProductQuantity,
  goToPay,
} from "../controller/cart.controller.js";
const router = Router();

// Crea un carro sin nececidad de pasarle ningun parametro
router.post("/", createCart);
// Ver los carritos por id
router.get("/:cid", getCart);
// Devuelve todos los carritos existentes
router.get("/", getAllCarts);
// Finaliza el proceco de compra
router.get(
  "/:cid/purchase",
  passport.authenticate("jwtCookies", { session: false }),
  goToPay
);
//Agregar producto con Cart id y Product id
router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwtCookies", { session: false }),
  addProductCart
);
// Actualiza el carrito entero
router.put("/:cid", udapteAllCart);
// Actualiza la cantidad del producto por body
router.put("/:cid/products/:pid", udapteProductQuantity);
// Elimina el producto indicado por params (pid)
router.delete("/:cid/products/:pid", deleteAllProductsToCart);
// Elimina todos los productos del carrito
router.delete("/:cid/", deleteProductToCart);

export default router;
