import CartsManager from "../persistencia/DAOs/cartsDAO/CartsMongo.js";
import TicketManager from "../persistencia/DAOs/ticketDAO/TicketMongo.js";
import ProductManager from "../persistencia/DAOs/productsDAO/ProductsMongo.js";
import Logger from "../utils/winston.js";
const ticketManager = new TicketManager();
const productManager = new ProductManager();
const carts = new CartsManager();
export const createCart = async (req, res) => {
  try {
    const createCart = await carts.createCart({});
    res.status(200).send({
      status: "Successful",
      message: "El carrito a sido creado correctamente",
      cart: createCart,
    });
  } catch (error) {
    Logger.error("ERROR createCart POST", error);
    res.status(500).send("No se pudo crear el carrito");
  }
};
export const getCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const getCartById = await carts.getCartsById(cid);

    res.status(200).send({
      status: "Successful",
      data: getCartById,
    });
  } catch (error) {
    console.log("ERROR getCartById GET", error);
    res
      .status(500)
      .send({ status: "Error", message: "No se pudo obtener el carrito" });
  }
};
export const getAllCarts = async (req, res) => {
  try {
    const getCarts = await carts.getCarts();
    res.status(200).send({
      status: "Successful",
      data: getCarts,
    });
  } catch (error) {
    Logger.error("ERROR getCarts GET", error);
    res.status(500).send("No se pudo encontrar el carrito");
  }
};
export const addProductCart = async (req, res) => {
  const { cid, pid } = req.params; // son Strings
  try {
    const product = await productManager.getProductsById(pid);
    // if (req.user.role === "premium") {
    //   if (product.owner._id == req.user._id) {
    //     return res.status(401).send({
    //       status: "Error",
    //       message: "No podes agregar un producto propio",
    //     });
    //   }
    // }
    const productToCart = await carts.addProductToCart(cid, pid);
    if (productToCart.status === "Error") {
      const message = productToCart.message;
      return res.status(400).send({
        status: "Error",
        message,
      });
    }
    res.status(200).send({
      status: "Successful",
      message: "Producto añadido correctamente",
      data: productToCart,
    });
  } catch (error) {
    Logger.error("ERROR addProductCart POST", error);
    res.status(500).json({
      status: "Error",
      message: "No se puede añadir el producto",
    });
  }
};
export const udapteAllCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const udapteCart = await carts.udapteCart(cid, req.body);
    res.status(200).send({
      status: "Successful",
      data: udapteCart,
    });
  } catch (error) {
    Logger.error("ERROR udapteCart PUT", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo actualizar el carrito",
    });
  }
};
export const udapteProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const udapteProductToCart = await carts.udapteProductToCart(
      cid,
      pid,
      quantity
    );
    if (udapteProductToCart === null) {
      res.status(200).send({
        status: "Error",
        message: "El producto a actualizar no existe",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        data: udapteProductToCart,
      });
    }
  } catch (error) {
    Logger.error("ERROR udapteCart PUT", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo actualizar el producto del carrito",
    });
  }
};
export const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params; // son Strings
  try {
    const deleteProduct = await carts.deleteProductToCart(cid, pid);
    if (deleteProduct === null) {
      res.status(404).send({
        status: "Error",
        message: "No se pudo encontrar el producto",
      });
    } else {
      res.status(200).send({
        status: "Successful",
        message: "Producto eliminado correctamente",
      });
    }
  } catch (error) {
    Logger.error("ERROR deleteProductToCart DELETE", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo eliminar el producto del carrito",
    });
  }
};
export const deleteAllProductsToCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const deleteProducts = await carts.deleteAllProductToCart(cid);
    res.status(200).send({
      status: "Successful",
      message: "Productos eliminados correctamente",
    });
  } catch (error) {
    Logger.error("ERROR deleteProducts DELETE", error);
    res.status(500).send({
      status: "Error",
      message: "No se pudo eliminar los productos",
    });
  }
};
export const goToPay = async (req, res) => {
  const { cid } = req.params;
  const tid = req.cookies.tid;
  try {
    const cartVerify = await carts.verifyDataToTicket(cid);
    const data = {
      purchaser: req.user.email,
      amount: cartVerify.total,
    };
    let ticket;
    ticket = await ticketManager.getTicketById(tid);
    if (ticket === null) {
      ticket = await ticketManager.createTicker(data);
      res.cookie("tid", ticket._id, { maxAge: 600000 });
    }
    res.status(200).json({ cart: cartVerify, ticket });
  } catch (error) {
    Logger.error("goToPay controller", error);
    res.status(500).json({
      status: "error",
      message: "No se pudo procesar la info de pago",
    });
  }
};
