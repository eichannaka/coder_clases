import { generateToken } from "../middlewares/jwt.js";
import * as service from "../services/user.services.js";
import { createHash, isValidPassword } from "../utils.js";
import 'dotenv/config';

export const registerResponse = async (req, res, next ) => {
    try {
        const { email, password } = req.body

        // Chequeo si user es admin
        //const isAdmin = email === "adminCoder@coder.com" && password === "adminCod3r123";
        const userData = { 
            ...req.body,
             password: createHash(password), 
             role: "user" // Rol por defecto
        };

        // Registrar el usuario
        const user = await service.register(userData);

        // validaciones
        if (!user) {
            req.session.error = "User registration failed or user already exists";
            return res.redirect("/views/register")
        }
        
        // Redirecciono a login cuando es exitoso
        res.redirect("/views/login");
    } catch (error) {
        req.session.error = "An unexpected error occurred during registration";
        res.redirect("/views/register");
    }
};

export const loginResponse = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Me aseguro que el email y la contraseña no sean undefined
        if(!email || !password) {
            req.session.error = "Email or passwors missing";
            return res.redirect("/views/login");
        }

        //Obtener usuario por email
        const user = await service.getByEmail(email);

        //Validar usuario y contraseña
        if(!user || !user.password){
            req.session.error = "User not found or password missing";
            return res.redirect("/views/login");
        }

        //verificar contraseña
        const isValid = isValidPassword(password, user.password);
        if(!isValid){
            req.session.error = "Invalid email or password";
            return res.redirect("/views/login");
        }

        //Chequeo si user es admin
        if(email === process.env.EMAIL_ADMIN && password === process.env.PASSWORD_ADMIN ) {
            user.role = "admin";
        }

        //passport => req.session.passport.user
        //establecer la sesion del usuario
        req.session.passport = { user: user._id };

        req.session.info = {
            loggedIn: true,
            contador: 1,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            //password: user.password
        };

        //Redirigir a perfil
        res.redirect("/views/profile");        
    } catch (error) {
        req.session.error = "An unexpected error occurred during login";
        res.redirect("/views/login");
    }
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

export const loginJwt = async (req, res, next) => {
    try {
        const user = await service.login(req.body.email);
        if(!user) res.json({ msg: 'Invalid credentials'});
        const token = generateToken(user);
        //res.header('Authorization', token).json({ msg: 'Login ok', token});
        res.cookie('token', token, { httpOnly: true }).json({ msg: 'Login ok', token})
    } catch (error) {
        next(error);
    }
}

export const loginFront = async (req, res, next) => {
    try {
        const user = await service.login(req.body.email);
        if(!user) res.json({ msg: 'Invalid credentials'});
        const token = generateToken(user);
        //res.cookie('token', token, { httpOnly: true }).json({ msg: 'Login ok', token})
        res.header('Authorization', token).json({ msg: 'Login ok', token});
    } catch (error) {
        next(error);
    }
}

export const current = (req, res, next) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
};

export const logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/views/login");
};

