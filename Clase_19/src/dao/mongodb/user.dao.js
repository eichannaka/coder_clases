import { UserModel } from "./models/user.model.js";

export default class UserDao {
    register = async (user) => {
        try {
            const { email } = user;
            const existUser = await UserModel.findOne({ email });
            if(existUser) return null;
            else return await UserModel.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    login = async (email, password) => {
        try {
            const isLogin = await UserModel.findOne({ email, password }); //Esto retorna null o el usuario
            return isLogin;
        } catch (error) {
            throw new Error(error);
        }
    };
    
}