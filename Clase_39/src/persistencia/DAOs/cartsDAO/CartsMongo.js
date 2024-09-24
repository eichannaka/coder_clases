import cartServices from "../../../services/carts.services.js";
import productsServices from "../../../services/products.services.js";
export default class CartsManager {
  // Obtiene los carritos creados
  async getCarts() {
    try {
      const cart = await cartServices.getAllCarts();
      return cart;
    } catch (error) {
      console.log("ERROR getCarts", error);
      const message = {
        status: "error",
        message: "No hay carritos o no se pudo acceder a la base de datos",
      };
      return message;
    }
  }
  // obtiene el producto segun el id pasado
  async getCartsById(id) {
    try {
      const cartById = await cartServices.getOneCartById(id);
      let total = 0;
      cartById.products.forEach((element) => {
        total = total + element.quantity * element._id.price;
      });
      const totalCart = {
        cartById,
        total,
      };
      return totalCart;
    } catch (error) {
      console.log("ERROR getCartsById", error);
      const message = {
        status: "error",
        message: "No hay carritos o no se pudo acceder a la base de datos",
      };
      return message;
    }
  }
  // Crea un carro sin nececidad de pasarle ningun parametro
  async createCart(obj) {
    try {
      const createCart = await cartServices.createCart(obj);
      return createCart;
    } catch (error) {
      console.log("ERROR createCart", error);
      const message = {
        status: "error",
        message: "No se pudo crear el carrito",
      };
      return message;
    }
  }
  // primero el id del producto desp el id del cart en el endpoint
  async addProductToCart(cid, pid) {
    if (!cid || !pid) {
      const message = {
        status: "Error",
        message: "Faltan rellenar campos",
      };
      return message;
    }
    try {
      const cartById = await cartServices.getOneCartById(cid);
      const productById = await productsServices.getOneProductById(pid);
      if (productById.stock === 0) {
        const response = {
          status: "Error",
          message: "No hay stock",
        };
        return response;
      }
      const filter = cartById.products.find(
        (element) => element._id._id == pid
      );
      if (filter === undefined) {
        cartById.products.push(pid);
      } else {
        filter.quantity++;
        productById.stock--;
      }

      cartById.save();
      productById.save();
      return cartById;
    } catch (error) {
      console.log(error);
      const message = {
        status: "Error",
        message: "No se pudo crear agregar el producto al carrito",
      };
      return message;
    }
  }
  // Elimina un el producto por el id del carrito
  async deleteProductToCart(cid, pid) {
    if (!cid || !pid) {
      const message = {
        status: "error",
        message: "Faltan rellenar campos",
      };
      return message;
    }
    try {
      const cartById = await cartServices.getOneCartById(cid);
      const productById = await productsServices.getOneProductById(pid);
      const indexToProductDelete = cartById.products.findIndex(
        (element) => element.id == pid
      );
      if (indexToProductDelete === -1) {
        const message = {
          status: "error",
          message: "No se encontro el producto",
        };
        return message;
      }
      cartById.products.splice(indexToProductDelete, 1);
      productById.stock++;
      cartById.save();
      return cartById;
    } catch (error) {
      console.log("deleteProductToCart MONGO", error);
      const message = {
        status: "error",
        message: "No se encontro el carrito",
      };
      return message;
    }
  }
  // Actualiza el carrito entero
  async udapteCart(cid, pUdapted) {
    if (!cid) {
      const message = {
        status: "error",
        message: "Faltan rellenar campos",
      };
      return message;
    }
    try {
      const cartById = await cartServices.udapteAllCart(cid, {
        products: pUdapted,
      });
      return cartById;
    } catch (error) {
      const message = {
        status: "error",
        message: "No se pudo actualizar el carrtio",
      };
      return message;
    }
  }
  // Actualiza la cantidad  del producto por body
  async udapteProductToCart(cid, pid, quantity) {
    try {
      const cartById = await cartServices.getOneCartById(cid);
      const quantityUdapte = cartById.products.filter(
        (element) => element.id == pid
      );
      if (quantityUdapte.length === 0) {
        const message = {
          status: "error",
          message: "No se pudo actulizar la cantidad",
        };
        return message; // throw new Error() q seria bloqueante
      } else {
        quantityUdapte.forEach((element) => {
          element.quantity = quantity;
        });
        cartById.save();
        return cartById;
      }
    } catch (error) {
      console.log("udapteProductToCart MONGO", error);
      const message = {
        status: "error",
        message: "No se encontro el carrito",
      };
      return message;
    }
  }
  // Elimina todos los productos del carrito
  async deleteAllProductToCart(cid) {
    try {
      const deleteProducts = await cartServices.deleteAllProduct(cid, {
        products: [],
      });
      return deleteProducts;
    } catch (error) {
      console.log("deleteAllProductToCart MONGO", error);
      const message = {
        status: "error",
        message: "No se pudo eliminar los productos del carrito",
      };
      return message;
    }
  }
  async verifyDataToTicket(cid) {
    try {
      const cart = await this.getCartsById(cid);
      const cartProducts = cart.cartById.products;
      cartProducts.forEach((product) => {
        const stock = product._id.stock;
        if (stock === 0) {
          const response = {
            status: "error",
            message: `No Hay stock de ${product._id.title}`,
          };
          return response;
        }
      });
      return cart;
    } catch (error) {}
  }
}
