import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  getAll = async () => {
    try {
      return await CartModel.find();
    } catch (error) {
      throw new Error(`Error getting all carts: ${error.message}`);
    }
  };

  getById = async (id) => {
    try {
      const response = await CartModel.findById(id);
      if (!response) {
        throw new Error(`Cart with id ${id} not found`);
      }
      return response;
    } catch (error) {
      throw new Error(`Error getting cart by id: ${error.message}`);
    }
  };

  create = async (cart) => {
    try {
      return await CartModel.create(cart);
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  };

  addProduct = async (id, productId) => {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        throw new Error(`Cart with id ${id} not found`);
      }

      const productIndex = cart.products.findIndex(p => p.id === productId);
      if (productIndex === -1) {
        // Product not in cart, add it with quantity 1
        cart.products.push({ id: productId, quantity: 1 });
      } else {
        // Product already in cart, increase quantity
        cart.products[productIndex].quantity += 1;
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error.message}`);
    }
  };

  delete = async (id) => {
    try {
      const cart = await CartModel.findByIdAndDelete(id);
      if (!cart) {
        throw new Error(`Cart with id ${id} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  };
}
