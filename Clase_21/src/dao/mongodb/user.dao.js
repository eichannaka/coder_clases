import { UserModel } from "./models/user.model.js";

export default class UserDao {
    register = async (user) => {
        try {
            const { email } = user;
            const existUser = await UserModel.findOne({ email });
            if(existUser) return null; // retorna null si el usuario ya existe
            return await UserModel.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    // login = async (email) => {
    //     try {
    //         const isLogin = await UserModel.findOne({ email }); //Esto retorna null o el usuario
    //         return isLogin;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // };

    async getById(id) {
        try {
          return await UserModel.findById(id);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      async getByEmail(email) {
        try {
          return await UserModel.findOne({ email });
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
}