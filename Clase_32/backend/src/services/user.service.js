// import UserDao from "../dao/mongodb/user.dao.js";
// const userDao = new UserDao();

import persistence from "../persistence/dao/factory.js";
import UserRepository from "../persistence/repository/user.repository.js";

const { userDao, cartDao } = persistence;

const userRepository = new UserRepository();

export const register = async (user) => {
    try {
        // Verifico si el usuario ya existe
        const { email, password } = user;
        const existingUser = await userDao.getByEmail(email);
        if(existingUser) return null;

        // Crear un carrito vacio para el nuevo usuario
        const newCart = await cartDao.create({ products: [] });

        // Crear nuevo usuario con el carrito asociado
        const newUser = {
            ...user,
            cart: newCart._id, //Asociar el ID del carrito al usuario
        };

        return await userDao.register(newUser);
    } catch (error) {
        throw new Error(error.message);
    }
};

//getUserById Usando repository (DTOs)
export const getUserById = async (id) => {
    try {
        return await userRepository.getUserById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

//getById Sin el uso de repository (DTOs)
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

export const updateUserRole = async (userId, newRole) => {
    try {
        // Encuentra al usuario por ID
        const user = await userDao.getById(userId);
        if (!user) throw new Error('User not found');

        // Actualiza el rol del usuario
        user.role = newRole;
        await user.save();

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}
