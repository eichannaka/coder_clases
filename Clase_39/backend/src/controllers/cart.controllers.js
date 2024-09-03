import * as service from "../services/cart.service.js";
import * as productService from "../services/product.service.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    return httpResponse.Ok(res, carts);
    //res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    if (!cart) return httpResponse.NotFound(res) 
      //res.status(404).json({ msg: "cart not found" });
    else return httpResponse.Ok(res, cart);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const cartData = req.body;
    const newCart = await service.create(cartData);
    if (!newCart) return httpResponse.BadRequest(res); 
      //res.status(400).json({ msg: "Bad request" });
    else return httpResponse.Created(res, newCart);
    //res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};
export const addProductToCart = async (req, res, next) => {
  try {
    //const { cid, pid } = req.params;
    let { quantity } = req.body;
    const { pid } = req.params;
    const { cart, _id, role } = req.user;

    console.log(role);
    
    if(!quantity || quantity < 1) quantity = 1;

    // Usar el servicio de productos para obtener el producto
    const product = await productService.getById(pid);
    
    if(!product){
      return httpResponse.NotFound(res, "Product not found");
    }

    // Verificar si el usuario es 'premium' y si es el propietario del producto
    if(role==='premium' && product.owner?.toString() === _id.toString()) {
      return httpResponse.Forbidden(res, "Premium users cannot add their own product to the cart");
    }  

    // Agregar el producto al carrito
    const newProdToUserCart = await service.addProduct(
      cart,
      pid,
      quantity
    )
    
    //const cart = await service.addProduct(cid, pid, quantity);
    if (!newProdToUserCart) return httpResponse.BadRequest(res); 
      //res.status(400).json({ msg: "Error add product to cart" });
    else return httpResponse.Ok(res, newProdToUserCart); 
    //res.status(200).json(newProdToUserCart);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantities = async (req, res, next) => {
  try {
    const {cid} = req.params;
    const {products} = req.body;

    const updatedCart = await service.updateProductQuantities(cid, products);

    if(!updatedCart) return httpResponse.BadRequest(res) 
      //res.status(400).json({ msg: "Bad request" });
    else return httpResponse.Ok(res, updatedCart);  
    //res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const delProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await service.delProduct(cid, pid);

    if(!cart) return httpResponse.NotFound(res); 
    //res.status(400).json( { msg: 'Cart or Product not found' });
    else return httpResponse.Ok(res, cart);  
    //res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.remove(cid);
    if (!cart) return httpResponse.NotFound(res) 
      //res.status(404).json({ msj: "Error removing cart" });
    else return httpResponse.Ok(res, cart);  
    //else res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const cleanCart =async (req, res, next ) => {
  try {
    const { cid } = req.params;
    const cart = await service.cleanCart(cid);
    if (!cart) return httpResponse.NotFound(res);
     //res.status(404).json({ msj: "Error cleaning cart" });
     else return httpResponse.Ok(res, cart);  
    //else res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};