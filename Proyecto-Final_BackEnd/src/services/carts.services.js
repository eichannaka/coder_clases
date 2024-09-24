import { cartsModel } from "../persistencia/mongoDB/models/carts.model.js";

class CartService {
  constructor(model) {
    this.model = model;
  }

  getAllCarts = async () => {
    const carts = await this.model.find();
    return carts;
  };
  getOneCartById = async (cid) => {
    const cart = await this.model
      .findById({ _id: cid })
      .populate("products");

    return cart;
  };
  createCart = async (obj) => {
    const newCart = await this.model.create(obj);
    return newCart;
  };
  udapteAllCart = async (cid, obj) => {
    const cartUdapted = await this.model.findByIdAndUpdate(cid, obj);
    return cartUdapted;
  };
  deleteAllProduct = async (cid, obj) => {
    const cartDeleted = await this.model.findByIdAndUpdate(cid, obj);
    return cartDeleted;
  };
}
const cartServices = new CartService(cartsModel);

export default cartServices;
