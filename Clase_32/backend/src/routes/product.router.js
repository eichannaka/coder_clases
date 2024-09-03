import { Router } from 'express';
import * as controller from "../controllers/product.controllers.js"
import { checkAuth } from '../middlewares/authJwt.js';
import { checkAdmin } from '../middlewares/checkAdminJwt.js';

const router = Router();

router.get('/', controller.getAllProducts);

router.get('/cat', controller.getProductByCategory);

router.get('/:id', controller.getProductById);

router.post('/', [checkAuth, checkAdmin], controller.createProduct);

router.put('/:id', [checkAuth, checkAdmin], controller.updateProduct);

router.delete('/:id', [checkAuth, checkAdmin], controller.deleteProduct);

//router.delete('/', [checkAuth, checkAdmin], controller.deleteAllProducts); // Nueva ruta para eliminar todos los productos

export default router;
