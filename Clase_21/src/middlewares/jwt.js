import * as services from '../services/user.services.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
    const payload = {
        userId: user._id
    };

    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
};

export const checkAuth = async(req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if(!authHeader) return res.status(403).json({ msg : 'Unhautorized'})
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, process.env.SECRET_KEY); //Esto decodifica el token
        const user = await services.getById(decode.userId);
        if(!user) return res.status(404).json({ msg: 'User not found'});

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Unhautorized'})
    }
}