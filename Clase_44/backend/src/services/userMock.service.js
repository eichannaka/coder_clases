import { UserMockModel } from "../persistence/dao/mongodb/models/userMock.model.js";
import { generateUserMock } from "../utils/userMock.utils.js";

export const createUserMock = async (cant = 50) => { //Ejemplo para 50 users Mocked
    try {
        const usersArray = [];
        for (let i = 0; i < cant; i++) {
            const user = generateUserMock();
            usersArray.push(user)            
        }
        return await UserMockModel.create(usersArray)
    } catch (error) {
        throw new Error(error);
    }
};

export const getUsersMock = async () => {
    try {
        return await UserMockModel.find({})
    } catch (error) {
        throw new Error(error);
    }
}