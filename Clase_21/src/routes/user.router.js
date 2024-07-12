import { Router } from "express";
//import { isLoggedIn } from "../middlewares/validateLogin.js";
import * as controller from "../controllers/user.controllers.js";
const router = Router();
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAuth } from "../middlewares/jwt.js";

router.post("/register", passport.authenticate('register'), controller.registerResponse);

//router.post("/login", passport.authenticate('login'), controller.loginResponse);

//router.get("/private", isAuth, (req, res) => res.json ({ msg: 'Ruta PRIVADA'}));

//! BOTON: | INICIAR SESION CON GITHUB
router.get("/register-github", passport.authenticate('github', { scope: [ 'user:email ' ] }));

router.get("/profile", passport.authenticate('github', {
    failureRedirect: '/views/login',
    successRedirect: '/views/profile-github',
    passReqToCallback: true
}));

router.post('/login', controller.loginJwt);

router.get('/private', checkAuth, (req, res) => res.json({ user: req.user}));

router.get("/info", controller.infoSession);

router.post("/logout", controller.logout);

export default router;