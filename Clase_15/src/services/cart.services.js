import CartDaoMongoDB from "../dao/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};
export const getById = async (id) => {
  try {
    return await cartDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (chart) => {
  try {
    return await cartDao.create(chart);
  } catch (error) {
    throw new Error(error);
  }
};
export const addProduct = async (id, productId) => {
  try {
    return await cartDao.addProduct(id, productId);
  } catch (error) {
    throw new Error(error);
  }
};
export const remove = async (id) => {
  try {
    return await cartDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};