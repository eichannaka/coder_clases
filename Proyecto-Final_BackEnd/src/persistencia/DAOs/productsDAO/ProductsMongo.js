import { porductsModel } from "../../mongoDB/models/products.model.js";
import productService from "../../../services/products.services.js";
export default class ProductManager {
  // XXXXX
  async getProducts(limit, page, query, sort) {
    const filtro = {
      limit,
      page,
      sort: sort ? { price: sort } : {},
    };

    try {
      const filterProducts = await productService.getProdctPaginate(
        query,
        filtro
      );
      return filterProducts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // XXXXX
  async getProductsById(id) {
    if (!id) {
      const message = "No se a proporcionado un ID del producto";
      return message;
    }
    try {
      const productById = await productService.getOneProductById(id);
      return productById;
    } catch (error) {
      console.log("getProductsById MONGO", error);
      return error;
    }
  }
  // XXXXXX
  async addProduct(product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
      owner
    } = product;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      return null;
    }
    // Normalizo el producto colocando todo en minuscula para que en las consultas por querys y params no haya confusiones
    const productNormalize = {
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      code,
      price,
      status,
      stock,
      category: category.toLowerCase(),
      thumbnail,
      owner
    };
    try {
      const newProduct = await productService.addProductSercice(
        productNormalize
      );
      return newProduct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // XXXXX
  async deleteProduct(id) {
    if (!id) {
      const message = "No se a proporcionado un ID del producto";
      return message;
    }
    try {
      const deleteProduct = await productService.deleteOneProduct(id);
      return deleteProduct;
    } catch (error) {
      console.log("deleteProduct MONGO", error);
      return error;
    }
  }
  // XXXXX
  async udapteProduct(id, productUdapted) {
    if (!id) {
      const message = "No se a proporcionado un ID del producto";
      return message;
    }
    const productOld = productService.getOneProductById(id);
    const {
      title,
      price,
      description,
      code,
      status,
      stock,
      category,
      thumbnail,
    } = productUdapted;
    try {
      const productUdapted = await productService.udapteOneProduct(id, {
        title: title ? title : productOld.title,
        description: description ? description : productOld.description,
        code: code ? code : productOld.code,
        price: price ? price : productOld.price,
        status: status ? status : productOld.status,
        stock: stock ? stock : productOld.stock,
        category: category ? category : productOld.category,
        thumbnail: thumbnail ? thumbnail : productOld.thumbnail,
      });
      return productUdapted;
    } catch (error) {
      console.log("udapteProduct MONGO", error);
      return error;
    }
  }
}
