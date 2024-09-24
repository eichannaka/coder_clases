import { userModel } from "../persistencia/mongoDB/models/user.model.js";
import Logger from "../utils/winston.js";
class UsersService {
  constructor(model) {
    this.model = model;
  }
  // Crea un user
  createUser = async (obj) => {
    try {
      const newUser = await this.model.create(obj);
      return newUser;
    } catch (error) {
      Logger.error("Error service createUser", error);
    }
  };
  // Cambia la contraseña
  changePass = async (uid, newPass) => {
    try {
      const newUser = await this.model.updateOne(
        { _id: uid },
        { password: newPass }
      );
      return newUser;
    } catch (error) {
      Logger.error("Error service changePass", error);
    }
  };
  // Obtiene un user dependiendo del email
  getUserByEmail = async (userEmail) => {
    try {
      const user = await this.model.findOne({ email: userEmail });
      return user;
    } catch (error) {
      Logger.error("Error service getUserByEmail", error);
    }
  };
  // Obtiene un user dependiendo del ID
  getUserById = async (uid) => {
    try {
      const user = await this.model.findOne({ _id: uid });
      return user;
    } catch (error) {
      Logger.error("Error service getUserById", error);
    }
  };
  // Obtiene todos los usuarios sin la informacion sensible
  getAllUsers = async () => {
    try {
      const users = await this.model
        .find({})
        .select("first_name last_name email role -_id ");
      return users;
    } catch (error) {
      Logger.error("Error service getAllUsers", error);
    }
  };
  // Elimina todos los usuarios que no tuvieron actividad en los ultimos 2 dias
  findInactiveUsers = async (tiempoInactivo) => {
    try {
      const usuariosEncontrados = await this.model.find({
        ultimaActividad: { $lt: tiempoInactivo },
      });
      return usuariosEncontrados;
    } catch (error) {
      Logger.error("Error service deleteInactiveUsers", error);
    }
  };
  // Elimina un user con el user Id que se le pase
  deleteById = async (uid) => {
    try {
      const deleteUser = this.model.findByIdAndRemove(uid);
      return deleteUser;
    } catch (error) {
      Logger.error("Error en service deleteById", error);
    }
  };
}
const usersServices = new UsersService(userModel);

export default usersServices;
