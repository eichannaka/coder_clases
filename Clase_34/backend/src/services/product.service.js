// import ProductDaoMongoDB from "../dao/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongoDB();

import persistence from '../persistence/dao/factory.js';
const { prodDao, userDao } = persistence;

export const getAll = async(page, limit, title, sort) => {
    try {
        return await prodDao.getAll(page, limit, title, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllWebSocket = async () => {
    try {
        return await prodDao.getAllWebSocket();
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllWebSocketPaginated = async (page, limit, title, sort) => {
    try {
        return await prodDao.getAllWebSocketPaginated(page, limit, title, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const getById = async(productId) => {
    try {
        return await prodDao.getById(productId);
    } catch (error) {
        throw new Error(error);
    }
}

export const getByCategory = async (page, limit, title, sort) => {
    try {
        return await prodDao.getByCategory(page, limit, title, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const create = async(prod) => {
    try {
        return await prodDao.create(prod);
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserByRole = async (role) => {
    try {
        return await userDao.getByRole(role);
    } catch (error) {
        throw new Error(error);
    }
}

export const update = async(id, prod) => {
    try {
        return await prodDao.update(id, prod);
    } catch (error) {
        throw new Error(error);
    }
}

export const remove = async(id) => {
    try {
        return await prodDao.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const removeAll = async() => {
    try {
        return await prodDao.removeAll();
    } catch (error) {
        throw new Error(error);
    }
}