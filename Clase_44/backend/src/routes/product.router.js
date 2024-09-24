import { Router } from 'express';
import * as controller from "../controllers/product.controllers.js"
import { checkAuth } from '../middlewares/authJwt.js';
import { checkAdmin, checkAdminOrPremium } from '../middlewares/checkRoleJwt.js';

const router = Router();

router.get('/', controller.getAllProducts);

router.get('/cat', controller.getProductByCategory);

router.get('/:id', controller.getProductById);

router.post('/', [checkAuth, checkAdminOrPremium], controller.createProduct);

router.put('/:id', [checkAuth, checkAdminOrPremium], controller.updateProduct);

router.delete('/:id', [checkAuth, checkAdminOrPremium], controller.deleteProduct);

//router.delete('/', [checkAuth, checkAdmin], controller.deleteAllProducts); // Nueva ruta para eliminar todos los productos

export default router;
