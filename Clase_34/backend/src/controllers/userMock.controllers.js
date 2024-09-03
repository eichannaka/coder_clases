import * as userMockService from '../services/userMock.service.js';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse = new HttpResponse();

export const createUserMock = async (req, res, next) => {
    try {
        const { cant } = req.query;

        const userMock = await userMockService.createUserMock(cant);
        if (!userMock) return httpResponse.NotFound(res, "User not found");
        return httpResponse.Ok(res, userMock)
    } catch (error) {
        next(error);
    }
};

export const getUsersMock = async (req, res, next) => {
    try {
        res.json(await userMockService.getUsersMock());
    } catch (error) {
        next(error);
    }
}