import { Router } from 'express';
import * as controller from "../controllers/product.controllers.js"
const router = Router();

router.get('/', controller.getAllProducts);

router.get('/:id', controller.getProductById);

router.post('/', controller.createProduct);

router.put('/:id', controller.updateProduct);

router.delete('/:id', controller.deleteProduct);

export default router;
