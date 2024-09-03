import * as service from "../services/user.service.js";
import { createHash, createResponse, isValidPassword } from "../utils/utils.js";
import { HttpResponse } from "../utils/http.response.js";
//import 'dotenv/config';
import config from '../../envConfig.js';
import { generateToken } from "../middlewares/authJwt.js";
import { sendEmail } from "../services/mailing/mailing.service.js";

const httpResponse = new HttpResponse();

export const register = async (req, res, next ) => {
    try {
        const { email, password, role } = req.body;

        const userData = { 
            ...req.body,
            password: createHash(password), 
            role // Rol por defecto
        };

        // Registrar el usuario y crear un carrito vacío
        const user = await service.register(userData);

        // validaciones
        if (!user) {
            return httpResponse.BadRequest(res, "User registration failed or user already exists");
            //return res.redirect("/views/register")
        }
        
        //res.status(201).json({ msg: "User registration successfully" });
        return httpResponse.Ok(res, "User registration successfully");
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
            return httpResponse.BadRequest(res, "Email or passwors missing");
            //return res.status(400).json( { msg: "Email or passwors missing" });
            //return res.redirect("/views/login");
        }

        //Obtener usuario por email
        const user = await service.getByEmail(email);

        //Validar usuario y contraseña
        if(!user || !user.password){
            return httpResponse.Unauthorized(res, "User not found or password missing");
            //return res.status(401).json({ msg: "User not found or password missing" });
            //return res.redirect("/views/login");
        }

        //verificar contraseña
        const isValid = isValidPassword(password, user.password);
        if(!isValid){
            return httpResponse.NotFound(res, "Invalid email or password");
            //return res.status(401).json({ msg: "Invalid email or password" });
            //return res.redirect("/views/login");
        }

        const token = generateToken(user, "10m");

        res.cookie('token', token, { httpOnly: true });
        return httpResponse.Ok(res, token);
        //Redirigir a perfil
        //res.redirect("/views/profile");        
    } catch (error) {
        next(error);
        //res.redirect("/views/login");
    }
};

export const current = async (req, res, next) => {
    try {
        if(req.user){
            const { _id } = req.user;
            const user = await service.getUserById(_id);
            return httpResponse.Ok(res, user);
            //createResponse(res, 200, user);
        } else {
            return httpResponse.Unauthorized(res, data);
        }
    } catch (error) {
        next(error);
    }
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


//Reset de password de email
export const generateResetPassword = async (req, res, next) => {
    try {
        const user = req.user;
        const token = await service.generateResetPassword(user);
        if(token){
            await sendEmail(user, 'resetPass', token);
            res.cookie('tokenPass', token)
            return httpResponse.Ok(res, token)
        } else return httpResponse.BadRequest(res, 'Invalid credentials for reset password request');
    } catch (error) {
        next(error);
    }
};

export const updatePassword = async (req, res, next) => {
    try {
        const user = req.user;
        const { password } = req.body;
        const { tokenPass } = req.cookies;
        if(!tokenPass) return httpResponse.Unauthorized(res, 'Unhautorized | Token expired');
        const updatePass = await service.updatePassword(password, user); 
        if(!updatePass) return httpResponse.NotFound(res, 'The password cannot be the same as the previous one');
        res.clearCookie('tokenPass');
        return httpResponse.Ok(res, updatePass);
    } catch (error) {
        next(error);
    }
};

export const togglePremiumRole = async (req, res, next) => {
    try {
        const { uid } = req.params;
        
        //Obtener el usuario por ID
        const user = await service.getById(uid);
        if(!user) return httpResponse.NotFound(res, 'User not found');

        //Cambiar el rol entre 'user' y 'premium'
        user.role = user.role === 'user' ? 'premium' : 'user';

        //Guardar los cambios
        const updatedUser = await service.updateUserRole(user);

        return httpResponse.Ok(res, updatedUser);
    } catch (error) {
        next(error);
    }
};
