import mongoose, { Model } from "mongoose";
import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {

  create = async () => {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (cid) => {
    try {
      const response = await CartModel.findById(cid).populate('products.product');
      if (!response) {
        throw new Error(`Cart with id ${cid} not found`);
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (cartId, prodId, quantity) => {
    try {
      const existProdInCart = await this.existProductInCart(cartId, prodId);
      if(existProdInCart) {
        return await CartModel.findOneAndUpdate(
          { _id: cartId, 'products.product': prodId },
          { $set: { 'products.$.quantity': existProdInCart.products[0].quantity + quantity }},
          { new: true }
        );
      } else {
        return await CartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: prodId, quantity } } },
          { new: true }
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  existProductInCart = async (cid, pid) => {
    try {
      return await CartModel.findOne({
        _id: cid,
        products: { $elemMatch: { product: pid } },
      })
    } catch (error) {
      throw new Error(error);
    }
  };

  delProduct = async (cartId, prodId) => {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      )
    } catch (error) {
      throw new Error(error);
    }
  };

  getAll = async () => {
    try {
      return await CartModel.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  
  updateProductQuantities = async (cartId, prodId, quantity) => {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: cartId, 'products.product': prodId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (cid) => {
    try {
      const cart = await CartModel.findByIdAndDelete(cid);
      if (!cart) {
        throw new Error(`Cart with id ${cid} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  };

  cleanCart = async (cid) => {
    try {
      const clearCart = await CartModel.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
      return clearCart;
    } catch (error) {
      throw new Error(error)
    }
  }
}