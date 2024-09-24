import usersServices from "../services/users.services.js";
import recoveryServices from "../services/recovery.services.js";
import { generateToken } from "../utils/jwt.js";
import { hashData } from "../utils/bycrypt.js";
import Logger from "../utils/winston.js";
export const registerUser = (req, res) => {
  const user = req.user;

  try {
    if (user.status === "Error") {
      res.status(404).send({ message: user.message });
    }
    const token = generateToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        signed: true,
        maxAge: 3600000,
      })
      .json({ message: "User creado con exito", token });
  } catch (error) {
    Logger.error("controller registerUser", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};
export const loginUser = async (req, res) => {
  const user = req.user;

  try {
    const token = generateToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        signed: true,
        maxAge: 3600000,
      })
      .json({ status: "Successful", token });
  } catch (error) {
    Logger.error("controller loginUser", error);
    res.status(500).json({ message: "Error al loguear usuario" });
  }
};

export const getCurrentUser = (req, res) => {
  const { user } = req;
  if (!user) {
    res
      .status(404)
      .json({ status: "Error", message: "Se necesita autenticar el usuario" });
  }
  const userResponse = {
    id: user._id,
    fullName: `${user.first_name + " " + user.last_name}`,
    age: user.age,
    email: user.email,
    role: user.role,
  };
  res.json({ status: "Successful", userResponse });
};
export const getUserWithEmail = async (req, res) => {
  const { email } = req;
  try {
    const user = await usersServices.getUserWithEmail(email);
    return user;
  } catch (error) {
    Logger.error("controller getUserWithEmail", error);
    const response = `No existe ningun usuario con es Email ${error}`;
    return response;
  }
};
// Verifica el link que este valido
export const recoveryUser = async (req, res) => {
  const { id } = req.params;
  const actualDate = new Date();
  const actualHour = actualDate.getHours();
  try {
    const expiresSession = await recoveryServices.getExpiresDate();
    const findSession = expiresSession.filter((doc) => doc.user_id == id);
    const lastSession = findSession[findSession.length - 1];
    const expireHour = lastSession.expires_start.getHours();
    if (actualHour > expireHour) {
      Logger.info(
        `La session actual expira a las ${expireHour} y son las ${actualHour}`
      );
      return res.redirect("http://localhost:8080/expireSetPass");
    }
    res.redirect(`http://localhost:8080/changePass?uid=${id}`);
  } catch (error) {
    Logger.error("controller recoveryUser", error);
  }
};
export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies) {
      res.send({ message: "No se pudo salir de la session", status: false });
    }
    res.clearCookie("token").send({ message: "Logout correcto", status: true });
  } catch (error) {
    Logger.error("controller logoutUser", error);
  }
};
// Cambia la contraseña
export const setNewPass = async (req, res) => {
  const { id } = req.params;
  const { newPass } = req.body;
  if (!newPass) {
    res
      .status(401)
      .json({ status: "error", message: "Faltan campos a rellenar" });
  }
  try {
    const newPassHash = await hashData(newPass);
    const newPassUser = await usersServices.changePass(id, newPassHash);
    console.log(newPassUser);
    res
      .status(200)
      .json({ status: "Successful", message: "Contraseña cambiada" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No se pudo cambiar la contraseña" });
    Logger.error("controller setNewPass", error);
  }
};
// Cambiar de role
export const setRole = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = usersServices.getUserById(uid);
    if (user.role !== "admin") {
      res
        .status(401)
        .json({
          status: "error",
          message: "No tienes permisos para modificar un usuario",
        });
    }
    if (user.role === "premium") {
      user.role = "user";
    } else {
      user.role = "premium";
    }
    user.save();
    if (user === null) {
      res
        .status(404)
        .json({ status: "error", message: "No se encontro el user" });
    }
    res.status(200).send({
      status: "succses",
      message: `user ${user.email} con id :${user._id} cambiado a ${user.role}`,
    });
  } catch (error) {
    Logger.error("Error en setRole controller", error);
    res.status(500).json({
      status: "error",
      message: `Error al cambiar el rol del user ${user._id}`,
    });
  }
};
