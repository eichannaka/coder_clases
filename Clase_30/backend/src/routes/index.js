import { Router } from 'express';
import productsRouter from './product.router.js';
import cartsRouter from './cart.router.js';
import chatRouter from './chat.router.js';
import userRouter from './user.router.js';
import viewRouter from './view.router.js';

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/chat", chatRouter);
router.use("/users", userRouter);
router.use("/views", viewRouter);

export default router;