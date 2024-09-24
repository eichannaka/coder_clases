// import ProductManager from "../dao/mongodb/product.dao";
// const productManager = new ProductManager();
import * as service from "../services/product.service.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, title, sort } = req.query;
        const hasTitle = title ? `&title=${title}` : "" ;
        const hasSort = sort ? `&sort=${sort}` : "" ;
        let products = await service.getAll(page, limit, title, sort);

        const nextLink = products.hasNextPage
            ? `http://localhost:8080/products?limit=${products.limit}&page=${products.nextPage}${hasTitle}${hasSort}`
            : null;
        const prevLink = products.hasPrevPage
            ? `http://localhost:8080/products?limit=${products.limit}&page=${products.prevPage}${hasTitle}${hasSort}`
            : null;
        const response = {
            payload: products.docs,
            info: {
                count: products.totalDocs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            }
        };

        if(!products) return httpResponse.NotFound(res);
          //res.status(404).json( { msg: "Product not found"});
        else return httpResponse.Ok(res, products);
        //else res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id }  = req.params;
        const product = await service.getById(id);
        if(!product) return httpResponse.NotFound(res);
        // res.status(404).json({msg: 'Product not found'});
        else return httpResponse.Ok(res, product);
        // else res.json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductByCategory = async (req, res, next) => {
    try {
        const { category, stock, page, limit, sort} = req.query;
        const hasCategory = category? `&category=${category}` : "" ;
        const hasStock = stock? `&stock=${stock}` : "" ;
        const hasSort = sort? `&sort=${sort}` : "" ;
        let products = await service.getByCategory(category, stock, page, limit, sort);
        const nextLink = products.hasNextPage
        ? `http://localhost:8080/products/cat?limit=${products.limit}&page=${products.nextPage}${hasCategory}${hasStock}${hasSort}`
        : null;
        const prevLink = products.hasPrevPage
        ? `http://localhost:8080/products/cat?limit=${products.limit}&page=${products.prevPage}${hasCategory}${hasStock}${hasSort}`
        : null;
        const response = {
            payload: products.docs,
            info: {
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            }
        };
        if(!products) return httpResponse.NotFound(res);
        // res.status(404).json( { msg: "Product not found"});
        else return httpResponse.Ok(res, response);
        // else res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const prod = req.body;

        //Obtener el usuario (owner) desde la sesion
        const owner = req.user?._id || req.user?.email; // Elijo entre id o email como owner
        const isPremium = req.user?.role === 'premium'; // Verificar si el usuario es premium

        //Asignar el propietario (owner) solo si es premium, de lo contrario se asigna 'admin' por defecto
        if (isPremium) {
            prod.owner = owner;
        } else {
            //Buscar el admin en la bd para asignar su _id como owner
            const adminUser = await service.getUserByRole('admin');
            if(!adminUser) {
                return httpResponse.NotFound(res, null, "Admin user not found");
                // res.status(404).json({msg: 'Admin user not found'});
            }
            prod.owner = adminUser._id;
        }

        //Crear el producto utilizando el servicio
        const product = await service.create(prod);
        
        if(!product) {
            return httpResponse.NotFound(res, product, "Error creating product");
            // res.status(404).json({msg: 'Error creating product'});
        }
        return httpResponse.Ok(res, product);
            // else res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user; //la información del usuario está en req.user por el JWT
        const role = user.role;
        const product = await service.getById(id);     

        if(!product) {
            return httpResponse.NotFound(res, null, "Product not found");
        }

        const owner = product.owner;

        //Verificar si el usuario es el propietario del producto o si es admin
        if(owner !== user._id && role !== 'admin'){
            return httpResponse.Unauthorized(res, null, "You can't update another owner's product");
        }

        const updateProduct = await service.update(id, req.body);

        if(!updateProduct) {
            return httpResponse.NotFound(res, null, "Error updating product");
            // res.status(404).json({msg: 'Error update product'});
        } 
        
        return httpResponse.Ok(res, updateProduct);
        // else res.status(200).json(updateProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user; //Ya que el middleware JWT añade esta información
        const role = user.role;
        const product = await service.getById(id);

        if(!product){
            return httpResponse.NotFound(res, null, "Product not found");
        }

        const owner = product.owner;

        //Verificar si el usuario es el propietario del producto o si es admin
        if(owner!== user._id && role!== 'admin'){
            return httpResponse.Unauthorized(res, null, "You can't delete another owner's product");
        }

        const deleteProduct = await service.remove(id);

        if(!deleteProduct) {
            return httpResponse.NotFound(res, null, "Error deleting product");
            // res.status(404).json({msg: 'Error deleting product'});
        }
        
        return httpResponse.Ok(res, deleteProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteAllProducts = async (req, res, next) => {
    try {
        const prodDeleteAll = await service.removeAll();
        if(!prodDeleteAll) return httpResponse.NotFound(res);
        // res.status(404).json({msg: 'Error deleting all products'});
        else return httpResponse.Ok(res, prodDeleteAll);
        // else res.status(200).json(prodDeleteAll);
    } catch (error) {
        next(error);
    }
};