import { Router } from "express";
const routerCart = Router();

import CartManager from "../controllers/CartManager.js";
import { __dirname } from "../utils.js";

const cartManager = new CartManager(`${__dirname}/models/carts.json`);

//mostrar carritos
routerCart.get('/:cid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        res.json(cart);
        console.log(cart);
    } catch (error) {
        next(error);
    }
})

//Crear carrito
routerCart.post('/', async (req, res, next) => {
    //Crear carrito
    try {
        const cart = await cartManager.createCart();
        res.json(cart);
    } catch (error) {
        next(error);
    }
})

//agregar producto a carrito
routerCart.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const {cid} = req.params;
        const {pid} = req.params; 
        const response = await cartManager.saveProductToCart(cid, parseInt(pid));
        res.json(response);
    } catch (error) {
        next(error)
    }
    
})



export default routerCart;