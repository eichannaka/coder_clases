//Para usar con JWT
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

export const checkAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        const { role } = req.user;
        if ( role !== "admin") return httpResponse.Unauthorized(res, "Access allowed only to administrators");
        else next();
    } catch (error) {
        next(error);
    }
}