import { socketServer } from "../app.js";
import ProductManager from "../persistencia/DAOs/productsDAO/ProductsMongo.js";
const manager = new ProductManager();

export const getProductRealTime = async (req, res) => {
  try {
    const oldProducts = await manager.getProducts();
    socketServer.on("connection", (socket) => {
      console.log(`Usuario conectado: ${socket.id}`);

      socket.emit("realtimeproduct.route:oldProducts", oldProducts);

      socket.on("disconnect", () => {
        console.log("Usuario desconectado");
      });
    });

    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).send("El archivo no existe o no se puede leer");
  }
};
