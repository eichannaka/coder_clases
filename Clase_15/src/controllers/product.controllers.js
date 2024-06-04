// import ProductManager from "../dao/mongodb/product.dao";
// const productManager = new ProductManager();
import * as service from "../services/product.services.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await service.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id }  = req.params;
        const product = await service.getById(id);
        if(!product) res.json({msg: 'Product not found'});
        else res.json(product);
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await service.create(req.body);
        if(!newProduct) res.status(404).json({msg: 'Error creating product'});
        else res.json(newProduct);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpdate = await service.update(id, req.body);
        if(!prodUpdate) res.status(404).json({msg: 'Error update product'});
        else res.json(prodUpdate);
    } catch (error) {
        
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDelete = await service.remove(id)
        if(!prodDelete) res.status(404).json({msg: 'Error deleting product'});
        else res.json(prodDelete);
    } catch (error) {
        next(error);
    }
};