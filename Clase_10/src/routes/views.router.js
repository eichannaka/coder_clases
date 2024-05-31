import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import { __dirname } from "../utils.js";

const productManager = new ProductManager(`${__dirname}/models/products.json`)
const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render('home', {allProducts});
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render('realtimeproducts', {
        title: "Backend",
        products: allProducts});
})

export default viewsRouter;