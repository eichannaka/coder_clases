//Para usar con JWT

import { createResponse } from '../utils.js';

export const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const { role } = req.user;
        if ( role !== "admin") createResponse(res, 401, "Endpoint is only to be accessed via admin");
        else next();
    } catch (error) {
        next(error);
    }
}