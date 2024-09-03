import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {
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

    async getById(id) {
        try {
          return await UserModel.findById(id).populate("cart");
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
      async getByEmail(email) {
        try {
          const user = await UserModel.findOne({ email });
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    
}