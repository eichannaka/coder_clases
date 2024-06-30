import * as service from "../services/user.services.js";

export const register = async (req, res, next ) => {
    try {
        const { email, password } = req.body

        // Chequeo si user es admin
        const isAdmin = email === "adminCoder@coder.com" && password === "adminCod3r123";
        const userData = isAdmin ? { ...req.body, role: "admin" } : req.body;

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
        next(error.message);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await service.login(email, password);

        if(!user){
            req.session.error = "Invalid email or password";
            return res.redirect("/views/login");
        }
            
        req.session.info = {
            loggedIn: true,
            contador: 1,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }

        res.redirect("/views/profile");
        
    } catch (error) {
        next(error.message);
    }
};

export const infoSession = (req, res, next) => {
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

