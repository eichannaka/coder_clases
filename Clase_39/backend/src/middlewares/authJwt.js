//Para usar con JWT

import * as services from '../services/user.service.js';
import jwt from 'jsonwebtoken';
//import 'dotenv/config';
import config from '../../envConfig.js'

export const generateToken = (user, time = '1h') => {
    const payload = {
        userId: user._id,
        role: user.role
    };

    const token = jwt.sign(payload, config.SECRET_KEY, {
        expiresIn: time
    });

    return token;
};


/**
 * Middleware que verifica si el token es válido a través de la cookie 'token'
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const checkAuth = async(req, res, next) => {
    try {
        //const authHeader = req.get('Authorization');
        //if(!authHeader) return res.status(403).json({ msg : 'Unhautorized'})
        //const token = authHeader.split(' ')[1];

        const token = req.cookies.token;
        if( !token ) return res.status(401).json({ msg: "Unauthorized" });

        const decode = jwt.verify(token, config.SECRET_KEY); //Esto decodifica el token
        const user = await services.getById(decode.userId);
        if(!user) return res.status(404).json({ msg: 'User not found'});

        //Refresh token
        const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        const tokenExp = decode.exp; // Tiempo de expiracion del token
        const timeUntilExp = tokenExp - now; // Tiempo hasta la expiracion en segundos

        if(timeUntilExp <= 300){
            // 300 segundos = 5 minutos
            // Generar un nuevo token con un tiempo de expiracion renovado
            const newToken = await generateToken(user, "1h");
            console.log(">>>> Se refrescó token");
            res.cookie("token", newToken, { httpOnly: true }); //Agregar el nuevo token a la cookie
            //res.set("Authorization", `Bearer ${newToken}`);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}