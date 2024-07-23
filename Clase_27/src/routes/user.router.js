import { Router } from "express";
//import { isLoggedIn } from "../middlewares/validateLogin.js";
import * as controller from "../controllers/user.controllers.js";
const router = Router();
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAuth } from "../middlewares/jwt.js";

//router.post("/register", passport.authenticate('register'), controller.registerResponse);

//router.post("/login", passport.authenticate('login'), controller.loginResponse);

//router.get("/private", isAuth, (req, res) => res.json ({ msg: 'Ruta PRIVADA'}));

router.post("/register", controller.registerResponse);


//! BOTON: | INICIAR SESION CON GITHUB
router.get("/register-github", passport.authenticate('github', { scope: [ 'user:email ' ] }));

router.get("/profile", passport.authenticate('github', {
    failureRedirect: '/views/login',
    successRedirect: '/views/profile-github',
    passReqToCallback: true
}));

router.post('/login', controller.loginJwt);

router.get('/private', passport.authenticate('jwt'), (req, res) => res.json({ user: req.user}));

router.get('/private-cookies', passport.authenticate('jwtCookies'), (req, res) => res.json({ user: req.user}));


//! BOTON: | INICIAR SESION CON GOOGLE
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {
    failureRedirect: '/views/login',
    successRedirect: '/views/profile',
    passReqToCallback: true
    })
);

router.get("/current", controller.current);

router.post("/logout", controller.logout);

//Pruebas ruteo avanzado con regex

/* ----------opcion 1 con regex generado manualmente---------- */
// router.get('/:email', (req, res) => {
//     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
//     const { email } = req.params;
//     if(email.match(emailRegex)) {
//         //if(emailRegex.test(email)) {
//         //await services.getByEmail(email) ......
//         res.send('Email válido');
//     } else res.status(404).send('Email invalido')
// });

/* ----------opcion 2 con regex---------- */
router.get('/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})', (req, res) => {
    //await services.getByEmail(email) ......
    res.send('Email válido');
});

/* ----------ejemplo otro endpoint (name) con regex---------- */

router.get('/name/:name([a-zA-Z]+)', (req, res) => { // para que no se ingrese un numero, solo letras
    //await services.getByEmail(email) ......
    res.send('Name válido');
});

/* ----------ejemplo uso de middleware para endpoint especifico y con regex ---------- */
router.get('/email/:email2', (req, res) => { 
    res.send('E-mail válido');
})

/* ----------este es el middleware dedicado al parametro, en este caso "email2" ---------- */
router.param('email2', (req, res, next, email2) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    const isValid = email2.match(emailRegex);
    if(isValid) next();
    else res.status(400).send('Invalid email format');
})

/* ----------ejemplo uso de middleware para todos los metodos (ver, no funciona mas) ---------- */
// router.all('/', (req, res, next) => {
//     console.log('se accedio a esta url: ', req.url);
//     next();
// })

/* ----------ejemplo uso de middleware de expresiones regulares, si en el medio hay mas palabras y comienza en este caso con ab, devolveria exitosamente ---------- */
// router.all(/hola/, (req, res, next) => {
//     res.send('ab*cd');
// });

/* ----------ejemplo uso de middleware de expresiones regulares, si termina con hola en este caso con ab, devolveria exitosamente ---------- */
// router.all(/.*hola$/, (req, res, next) => {
//     res.send('ab*cd');
// });

/* ----------Para que no muestre cannot get y sea mas amigable para el front (SIEMPRE DEBE IR AL FINAL) ---------- */
router.get('*', (req, res) => {
    //await services.getByEmail(email) ......
    res.send('Ruta inexistente');
});


export default router;