import { Router } from "express";
import { isLoggedIn, validateLogin } from "../middlewares/validateLogin.js";
import * as controller from "../services/product.services.js";
import { isAuth } from "../middlewares/isAuth-sessions.js";

const router = Router();

router.get("/login", isLoggedIn, (req, res) => {
  const error = req.session?.error;
  req.session.error = null; //limpia el error despues de renderizar
  res.render("login", { error });
});

router.get("/register", isLoggedIn, (req, res) => {
  const error = req.session.error;
  req.session.error = null; //limpia el error despues de renderizar
  res.render("register", { error });
});
router.get("/profile", validateLogin, (req, res) => {
  const user = req.session?.info;
  res.render("profile", { user });
});

router.get("/profile-github", isAuth, (req, res) => {
  console.log("req.user: ", req.user);
  const user = req.user.toObject();
  res.render("profile", { user });
})

router.get("/", (req, res) => {
  res.render("jwt")
})

router.get("/home", async (req, res) => {
  try {
    const productos = await controller.getAllWebSocket();
    res.render("home", { productos });
  } catch (error) {
    res.render("error");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    res.render("error");
  }
});

export default router;