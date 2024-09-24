import ProductManager from "../persistencia/DAOs/productsDAO/ProductsMongo.js";
import CartManager from "../persistencia/DAOs/cartsDAO/CartsMongo.js";
const productManager = new ProductManager();
const cartManager = new CartManager();
export const loginView = (req, res) => {
  res.render("login");
};
export const homeView = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query; // devuelve string
  const products = await productManager.getProducts(
    parseInt(limit),
    parseInt(page),
    query,
    sort
  );
  const document = products.docs;
  const user = req.user.role === "user" || "premium" ? true : false;
  res.render("home", { document, user });
};
export const registerView = (req, res) => {
  res.render("registro");
};
export const profileView = (req, res) => {
  res.render("profile");
};
export const errorRegistroView = (req, res) => {
  res.render("errorRegistro");
};
export const checkOutView = async (req, res) => {
  res.render("checkOut");
};
export const recoveryView = async (req, res) => {
  res.render("recoveryPass");
};
export const setPass = async (req, res) => {
  res.render("setNewPassword");
};
export const expireSetPass = async (req, res) => {
  res.render("expireSession");
};
export const cartView = async (req, res) => {
  const cid = req.query.cart;
  const cart = await cartManager.getCartsById(cid);
  const products = cart.cartById.products;
  const total = cart.total;
  res.render("cart", { products, total });
};
