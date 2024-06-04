import * as service from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    res.status(200).json(carts);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    if (!cart) res.status(404).json({ msg: "cart not found" });
    else res.status(200).json(cart);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
    const cart = await service.create(req.body);
    console.log("cart.controller: ", cart);
    if (!cart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(cart);
  } catch (error) {
    next(error.message);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await service.addProduct(cid, pid);
    if (!cart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(cart);
  } catch (error) {
    next(error.message);
  }
};
export const remove = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.remove(cid);
    if (!cart) res.status(404).json({ msj: "Error removing cart" });
    else res.status(201).json(cart);
  } catch (error) {
    next(error.message);
  }
};