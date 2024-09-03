//Este middleware sirve para usar con JWT
//--------------------------------------------------

import { logger } from '../utils/logger.js';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

export const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const { role } = req.user;
        if ( role !== "admin"){
            logger.warning(`Unauthorized access attempt by user with role: ${role}`);
            return httpResponse.Unauthorized(res, "Access allowed only to administrators");
        } else {
            logger.info(`Access granted by user with role: ${role}`);
            next();
        } 
    } catch (error) {
        logger.error(`Error in checkAdmin middleware: ${error.message}`);
        next(error);
    }
}

export const checkAdminOrPremium = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'admin' && role !== 'premium') {
            logger.warning(`Unauthorized access attempt by user with role: ${role}`);
            return httpResponse.Unauthorized(res, "Access allowed only to administrators or premium users");
        }
        logger.info(`Access granted by user with role: ${role}`);
        next();
    } catch (error) {
        logger.error(`Error in checkAdminOrPremium middleware: ${error.message}`);
        next(error);
    }
}