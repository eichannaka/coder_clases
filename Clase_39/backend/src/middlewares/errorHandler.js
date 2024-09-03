import { logger } from '../utils/logger.js'
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log( `error ${error.message}`) 
    const status = error.status || 500
    logger.error(error.message);
    return httpResponse.ServerError(res, error.message);
    //res.status(status).send({msg: error.message})
    //createResponse(res, status, error)
}