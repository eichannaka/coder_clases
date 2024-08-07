import * as service from "../services/user.services.js";
import { createHash, isValidPassword } from "../utils.js";
//import 'dotenv/config';
import config from '../../envConfig.js';
import { generateToken } from "../middlewares/authJwt.js";

export const register = async (req, res, next ) => {
    try {
        const { email, password } = req.body

        const userData = { 
            ...req.body,
             password: createHash(password), 
             role: "user" // Rol por defecto
        };

        // Registrar el usuario y crear un carrito vacío
        const user = await service.register(userData);

        // validaciones
        if (!user) {
            return res.status(400).json({ msg: "User registration failed or user already exists"})
            //return res.redirect("/views/register")
        }
        
        res.status(201).json({ msg: "User registration successfully" });
        // Redirecciono a login cuando es exitoso
        //res.redirect("/views/login");
    } catch (error) {
        next(error);
        //res.redirect("/views/register");
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Me aseguro que el email y la contraseña no sean undefined
        if(!email || !password) {
            return res.status(400).json( { msg: "Email or passwors missing" });
            //return res.redirect("/views/login");
        }

        //Obtener usuario por email
        const user = await service.getByEmail(email);

        //Validar usuario y contraseña
        if(!user || !user.password){
            return res.status(401).json({ msg: "User not found or password missing" });
            //return res.redirect("/views/login");
        }

        //verificar contraseña
        const isValid = isValidPassword(password, user.password);
        if(!isValid){
            return res.status(401).json({ msg: "Invalid email or password" });
            //return res.redirect("/views/login");
        }

        //Chequeo si user es admin
        if(email === config.EMAIL_ADMIN && password === config.PASSWORD_ADMIN ) {
            user.role = "admin";
        }

        const token = generateToken(user, "10m");

        res.cookie('token', token, { httpOnly: true }).json({ msg: 'Login successful', token });
        //Redirigir a perfil
        //res.redirect("/views/profile");        
    } catch (error) {
        next(error);
        //res.redirect("/views/login");
    }
};

export const current = (req, res, next) => {
    res.json({
        user: req.user,
    });
};

export const logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json( {msg: 'logout successful'});
    //res.redirect("/views/login");
};

export const githubResponse = (req, res, next) => {
    try {
        //console.log(req.user);
        return res.redirect("/views/profile");  
    } catch (error) {
        next(error);
    }
}

export const googleResponse = async(req, res, next) => {
    try {
        //console.log(req.user);
        if(req.user){
            return res.redirect("/views/profile");  
        } else {
            return res.redirect("/views/login")
        }
    } catch (error) {
        next(error);
    }
}
