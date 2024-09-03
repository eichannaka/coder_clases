import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcryptjs from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url) // Ruta del archivo
export const __dirname = dirname(__filename)

/**
 * Funcion que realiza el hasheo de contraseña a través de bcryptjs con el metodo hashSync
 * Recibe password sin encriptar,
 * retorna password encriptado
 * @param {*} password tipo String 
 * @returns password hasheada
*/
export const createHash = (password) => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt);
}

/**
 * Función que compara password en string plano con password hasheada del usuario
 * @param {*} password  Contraeña proporcionada por el usuario sin encriptar
 * @param {*} hash Contraseña hasheada en la base de datos
 * @returns boolean
 */
export const isValidPassword = (password, hash) => {
    if (!password || !hash) {
        throw new Error('Both password and hashedPassword must be provided');
    }
    return bcryptjs.compareSync(password, hash);
}


/*------------------------------------------------------------------------------------*/

//Para crear las respuestas genericas de los controllers
export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data);
}