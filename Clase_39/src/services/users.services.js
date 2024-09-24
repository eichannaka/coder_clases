import { userModel } from "../persistencia/mongoDB/models/user.model.js";

class UsersService {
  constructor(model) {
    this.model = model;
  }

  createUser = async (obj) => {
    const newUser = await this.model.create(obj);
    return newUser;
  };
  changePass = async (uid, newPass) => {
    const newUser = await this.model.updateOne(
      { _id: uid },
      { password: newPass }
    );
    return newUser;
  };
  getUserByEmail = async (userEmail) => {
    const user = await this.model.findOne({ email: userEmail });
    return user;
  };
  getUserById = async (uid) => {
    const user = await this.model.findOne({ _id: uid });
    return user;
  };
}
const usersServices = new UsersService(userModel);

export default usersServices;
