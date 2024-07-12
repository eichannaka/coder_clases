import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url) // Ruta del archivo
export const __dirname = dirname(__filename)


//Bcrypt
import bcrptjs from 'bcryptjs';

/**
 * Funcion que realiza el hasheo de contraseña a través de bcryptjs con el metodo hashSync
 * @param {*} password tipo String 
 * @returns password hasheada
*/
export const createHash = (password) => {
    const salt = bcrptjs.genSaltSync(10)
    return bcrptjs.hashSync(password, salt);
}

/**
 * Función que compara password en string plano con password hasheada del usuario
 * @param {*} password  tipo string
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */
export const isValidPassword = (password, user) => {
    return bcrptjs.compareSync(password, user.password);
}