import UserDao from "../dao/mongodb/user.dao.js";

const userDao = new UserDao();

export const register = async (user) => {
    try {
        // Verifico si el usuario ya existe
        const existingUser = await userDao.getByEmail(user.email);
        if(existingUser) return null;

        // Registro nuevo usuario
        return await userDao.register(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async( email ) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getById = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
}