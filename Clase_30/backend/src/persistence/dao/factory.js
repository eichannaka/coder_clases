//En este caso no es necesario usar Factory porque vamos a manejar una sola bd, con Dao bastaria, pero es a modo de prueba

import ProductDaoMongoDB from './mongodb/product.dao.js'; 
import ProductDaoFS from './filesystem/product.dao.js';
import CartDaoMongoDB from "./mongodb/cart.dao.js";
import UserDaoMongoDB from "./mongodb/user.dao.js";
import { initMongoDB } from '../../db/connection.js';
import config from '../../../envConfig.js';

let prodDao = null;
let userDao = null;
let cartDao = null;

let persistence = config.PERSISTENCE;

switch (persistence) {
    case 'FS':
        console.log(persistence);
        prodDao = new ProductDaoFS('./src/data/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
        break;
    case 'MONGO':
        console.log(persistence)
        initMongoDB();
        userDao = new UserDaoMongoDB();
        prodDao = new ProductDaoMongoDB();
        cartDao = new CartDaoMongoDB();
        break;
    // case 'SQL':
    //     userDao = new UserDaoSql();
    //     prodDao = new ProductDaoSql();
    //     cartDao = new CartDaoSqlDB();
    default:
        prodDao = new ProductDaoFS('./src/data/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
        break;
}

export default { userDao, prodDao, cartDao };