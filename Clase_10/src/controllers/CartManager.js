import fs from 'fs';
import { __dirname } from '../utils.js';
import {v4 as uuidv4} from 'uuid';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager(`${__dirname}/models/products.json`);

export default class CartManager {
    constructor(path){
    this.path = path;
    }

    getAllCarts = async () => {
        try {
            if(fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                const cartsJSON = JSON.parse(carts);
                return cartsJSON;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    createCart = async () => {
        try {
            const cart = {
                id : uuidv4(),
                products: [],
            };
            const cartsFile = await this.getAllCarts();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    getCartById = async (idCart) => {
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find((c) => c.id === idCart);
            if(!cart) return null;
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }



    saveProductToCart = async (idCart, idProduct) => {
        try {
            const prodExist = await productManager.getProductById(parseInt(idProduct));
            if(!prodExist){
                throw new Error('Product not exist');
            } else {
                const cartExist = await this.getCartById(idCart); 
                if(!cartExist) {
                    throw new Error('Cart not exist');
                } else {
                    let cartsFile = await this.getAllCarts();
                    const existProdInCart = cartExist.products.find(prod => prod.id === parseInt(idProduct));
                    if(!existProdInCart) {
                        const product = {
                            id: idProduct, 
                            quantity: 1
                        };
                        cartExist.products.push(product);
                    } else {
                        existProdInCart.quantity++;
                    }
                    const updateCarts = cartsFile.map((cart) => {
                        if(cart.id === idCart) {
                            return cartExist;
                        } else {
                            return cart;
                        }
                    })
                    await fs.promises.writeFile(this.path, JSON.stringify(updateCarts));
                    return cartExist;
                }
            }

        } catch (error) {
            throw new Error(error);
        }

    }
}
