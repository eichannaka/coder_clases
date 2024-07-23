import * as services from '../services/user.services.js';
import jwt from 'jsonwebtoken';
//import 'dotenv/config';
import config from '../../envConfig.js'

export const generateToken = (user) => {
    const payload = {
        userId: user._id
    };

    const token = jwt.sign(payload, config.SECRET_KEY, {
        expiresIn: '1h'
    });

    return token;
};

export const checkAuth = async(req, res, next) => {
    try {
        //const authHeader = req.get('Authorization');
        const token = req.cookies.token;
        //if(!authHeader) return res.status(403).json({ msg : 'Unhautorized'})
        //const token = authHeader.split(' ')[1];
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
            const newToken = generateToken(user, "5m");
            console.log(">>>>Se refrescó token");
            res.set("Authorization", `Bearer ${ newToken }`); //Agregar el nuevo token al encabezado
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Unhautorized'})
    }
}