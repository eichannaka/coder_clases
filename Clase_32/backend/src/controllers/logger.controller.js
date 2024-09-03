import { HttpResponse } from "../utils/http.response.js";
import { logger } from "../utils/logger.js";

const httpResponse = new HttpResponse();

export const loggerTest = async (req, res, next) => {
    try {
        logger.fatal("logger test fatal");
        logger.error("logger test error");
        logger.warning("logger test warn");
        logger.info("logger test info");
        logger.debug("logger test debug");
        return httpResponse.Ok(res, "Logger Test Success");
    } catch (error) {
        next(error);
    }
}