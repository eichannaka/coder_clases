// import UserDao from "../dao/mongodb/user.dao.js";
// const userDao = new UserDao();

import persistence from "../persistence/dao/factory.js";
import UserRepository from "../persistence/repository/user.repository.js";
import { sendEmail } from "./mailing/mailing.service.js";
import { generateToken } from "../middlewares/authJwt.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import config from "../../envConfig.js";

const { userDao, cartDao } = persistence;
const userRepository = new UserRepository();

export const register = async (user) => {
    try {
        const { email, password } = user;
        console.log(user.role);
        

        // Verifico si el usuario ya existe
        const existingUser = await userDao.getByEmail(email);
        if(existingUser) return null;

        // Crear un carrito vacio para el nuevo usuario
        const newCart = await cartDao.create({ products: [] });
        
        //Asignar rol de usuario o admin
        const role = 
            email === config.EMAIL_ADMIN
            ? 'admin'
            : user.role === 'premium'
            ? 'premium'
            : 'user';

        // Crear nuevo usuario con el carrito asociado
        const newUser = {
            ...user,
            cart: newCart._id, //Asociar el ID del carrito al usuario
            role,
        };

        await sendEmail(user, 'register');

        // Registrar el usuario en la base de datos
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
};

/**
 * Generar token de restablecimiento de contraseña
 * @param {*} user 
 * usuario logueado va a hacer click en boton "RESTABLECER CONTRASEÑA". Éste botón llama a un endpoint que tiene esa funcionalidad
 */
export const generateResetPassword = async (user) => {
    try {
        const token = generateToken(user, '1h');
        return token;
    } catch (error) {
        throw new Error(error);   
    }
};

// Actualizar contraseña de usuario
export const updatePassword = async (pass, user) => {
    try {
        //Verificar que la nueva contraseña no sea igual a la anterior
        const isEqual = isValidPassword(pass, user.password);
        if(isEqual) throw new Error('Password must be different');
        
        //Actualizar la contraseña del usuario
        const newPass = createHash(pass);
        return await userDao.updatePassword(user._id, { password: newPass });
    } catch (error) {
        throw new Error(error);
    }
}

export const updateUserRole = async (user) => {
    try {
        const updatedUser = await userDao.updateUserRole(user);
        return updatedUser;
    } catch (error) {
        throw new Error(error);
    }
}
