import { socketServer } from "../app.js";
import ProductManager from "../persistencia/DAOs/productsDAO/ProductsMongo.js";
import UserManager from "../persistencia/DAOs/usersDAO/UsersMongo.js";
import Logger from "../utils/winston.js";
const manager = new ProductManager();
const user = new UserManager();
export const getAllProducts = async (req, res) => {
  // este endpoint devuelve un arreglo [productos]
  const { limit = 10, page = 1, sort, ...query } = req.query; // devuelve string
  try {
    const products = await manager.getProducts(
      parseInt(limit),
      parseInt(page),
      query,
      sort
    );
    const resJson = {
      status: products.docs.length === 0 ? "error" : "succses",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `http://localhost:8080/api/products?page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `http://localhost:8080/api/products?page=${products.nextPage}`
        : null,
    };
    res.status(200).json(resJson);
  } catch (error) {
    Logger.error("controller getAllProducts", error);
    res.status(500).json({
      status: "Error",
      message: "El archivo no existe o no se puede leer",
    });
  }
};

export const getProductById = async (req, res) => {
  // devuelve un arreglo de productos []
  const { pid } = req.params; // params son strings ""
  try {
    // mongoose son numeber y sring el id
    const productById = await manager.getProductsById(pid);
    if (productById === null) {
      res.status(404).send("Producto no encontrado");
    }
    res.status(200).send(productById); // devuelve {}
  } catch (error) {
    Logger.error("controller getProductById", error);
    res.status(500).send({
      status: "Error",
      message: "El archivo no existe o no se puede leer",
    });
  }
};
export const addProduct = async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
    owner,
  } = req.body;
  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail,
    owner,
  };
  try {
    const userOwner = await user.getUserById(owner);
    if (userOwner.role === "user") {
      res.status(401).send("No tienes permisos para agregar un producto");
    }
    const addProduct = await manager.addProduct(product);
    if (addProduct === null) {
      res.status(400).send({
        status: "Error",
        message: "Faltan campos a rellenar",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "El producto a sido agregado correctamente",
        product: addProduct._id
      });
      // La instancia esta creada en server.js, solo utilizo este emit para poder actualizar los productos
      socketServer.emit("product.route:products", addProduct);
    }
  } catch (error) {
    Logger.error("controller addProduct", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo agregar el producto",
    });
  }
};
export const udapteProduct = async (req, res) => {
  const { pid } = req.params; // params son strings ""
  const productUdapted = req.body;
  try {
    const udapteProduct = await manager.udapteProduct(pid, productUdapted);

    res.status(200).send({
      status: "Successful",
      message: "El producto a sido actualizado correctamente",
      data: udapteProduct,
    });
  } catch (error) {
    Logger.error("controller udapteProduct", error);
    res
      .status(500)
      .send({ status: "Error", message: "El proucto no se pudo actualizar" });
  }
};
export const deleteProduct = async (req, res) => {
  const { pid } = req.params; // params son strings ""
  try {
    if (req.user.role === "user") {
      res.status(401).send("No tienes permisos para eliminar un producto");
    }
    const product = await manager.getProductsById(pid);
    if (product.owner !== req.user._id) {
      res
        .status(401)
        .send("No tienes permisos para eliminar un producto si no es tuyo");
    }
    const deleteProduct = await manager.deleteProduct(pid);
    if (deleteProduct === null) {
      res.status(400).send({
        status: "Error",
        message: "Coloque el id a eliminar",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "El producto a sido eliminado correctamente",
      });
      // La instancia esta creada en server.js, solo utilizo este emit para poder actualizar los productos
      socketServer.emit("product.route:deleteProduct", deleteProduct);
    }
  } catch (error) {
    Logger.error("controller deleteProduct", error);
    res.status(500).send("No se pudo eliminar el producto");
  }
};
