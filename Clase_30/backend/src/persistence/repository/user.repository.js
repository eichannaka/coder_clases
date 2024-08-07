import factory from '../dao/factory.js';
const { userDao } = factory;
import UserDTO from '../dto/user.req.dto.js';

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }
}