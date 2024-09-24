import { userModel } from "../../mongoDB/models/user.model.js";
import usersServices from "../../../services/users.services.js";
export default class UserManager {
  // Obtiene todos los usuarios
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log("ERROR getAllUsers", error);
      throw new Error({
        status: "error",
        message: "No hay users o no se pudo acceder a la base de datos",
      });
    }
  }
  async getUserById(uid) {
    if (!uid) {
      const response = `Faltan campos por completar`;
      return response;
    }
    try {
      const user = await usersServices.getUserById(uid);
      return user;
    } catch (error) {
      console.log("ERROR getUserById", error);
    }
  }
  async getUserByEmail(email) {
    if (!email) {
      const response = `Faltan campos por completar`;
      return response;
    }
    try {
      const user = await usersServices.getUserByEmail(email);
      return user;
    } catch (error) {
      console.log("ERROR getUserById", error);
    }
  }
  async createUser(user) {
    console.log(user);

    const { first_name, last_name, age, email, password, ultimaActividad } =
      user;
    if (!first_name || !last_name || !age || !email || !password) {
      const response = { status: "Error", message: "Falta rellenar campos " };
      return response; // throw new Error() q seria bloqueante
    }
    try {
      if (email === "coderadmin@hotmail.com") {
        const newAdminUser = {
          first_name,
          last_name,
          age,
          email,
          role: "admin",
          password,
        };
        const newUserAdminDB = await usersServices.createUser(newAdminUser);
        return newUserAdminDB;
      }
      const userDB = {
        first_name,
        last_name,
        age,
        email,
        password,
        ultimaActividad: new Date(),
      };
      const createUser = await usersServices.createUser(userDB);
      console.log(createUser);
      return createUser;
    } catch (error) {
      console.log("ERROR createUser", error);
      const response = `No se pudo crear el usuario`;
      return response;
    }
  }
  async loginUser(user) {
    const { email, password } = user;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        const isPassword = await compareData(password, user.password);
        console.log(isPassword);
        if (isPassword) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.log("ERROR loginUser", error);
      throw new Error("No se pudo encontrar el usuario");
    }
  }
}
