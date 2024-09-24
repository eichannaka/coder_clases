import usersServices from "../services/users.services.js";
import recoveryServices from "../services/recovery.services.js";
import { generateToken } from "../utils/jwt.js";
import { hashData } from "../utils/bycrypt.js";
import { transporter } from "../utils/nodeMailer.js";
import Logger from "../utils/winston.js";

// Registra un nuevo user
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
// Loguea un user ya creado
export const loginUser = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }
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
// Loguea un user ya creado con github

export const loginUserGithub = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }
    const token = generateToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        signed: true,
        maxAge: 3600000,
      })
      .redirect("https://e-commercecoderhouse-production.up.railway.app/home");
  } catch (error) {
    Logger.error("controller loginUser", error);
    res.status(500).json({ message: "Error al loguear usuario" });
  }
};
// Devuelve el user logueado
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
// Devuelve un user dependiendo del email
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
      return res.redirect(
        "https://e-commercecoderhouse-production.up.railway.app/expireSetPass"
      );
    }
    res.redirect(
      `https://e-commercecoderhouse-production.up.railway.app/changePass?uid=${id}`
    );
  } catch (error) {
    Logger.error("controller recoveryUser", error);
  }
};
export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies) {
      res.send({ message: "No se pudo salir de la session", status: "error" });
    }
    res
      .clearCookie("token")
      .send({ message: "Logout correcto", status: "succes" });
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
  const { role } = req.body;
  try {
    const user = await usersServices.getUserById(uid);
    if (user.role === role) {
      return res.status(200).json({
        status: "error",
        message: `Este usuario ya tiene el role: ${role}`,
      });
    }
    user.role = role;
    user.save();

    res.status(200).send({
      status: "succses",
      message: `user ${user.email} cambiado a ${user.role}`,
    });
  } catch (error) {
    Logger.error("Error en setRole controller", error);
    res.status(500).json({
      status: "error",
      message: `Error al cambiar el rol del user ${user._id}`,
    });
  }
};
// Devuelve todos los usuarios sin datos sensibles
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersServices.getAllUsers();
    if (!users) {
      res.status(404).json({ message: "Usuarios no encontrados" });
    }
    res.status(200).json({ message: "Usuarios encontrados ", users });
  } catch (error) {
    Logger.error("Error getAllUsers Controller", error);
    res.status(500).json({ error: "Error en el servidor " });
  }
};
// Elimina al usuario que por 2 dias no se logueo y envia un mail de notificacion
export const deleteUserInactive = async (req, res) => {
  try {
    const dosDiasEnMilisegundos = 2 * 24 * 60 * 60 * 1000;
    const tiempoInactivo = new Date(Date.now() - dosDiasEnMilisegundos);

    const usuariosInactivos = await usersServices.findInactiveUsers(
      tiempoInactivo
    );
    if (usuariosInactivos.length === 0) {
      res.status(404).json({ message: "No se encontraron usuarios inactivos" });
    }
    for (const usuario of usuariosInactivos) {
      // Enviar correo electrónico
      const mailOptions = {
        from: "Coder-E-Comerce",
        to: usuario.email,
        subject: "Eliminación de cuenta",
        text: "Tu cuenta ha sido eliminada debido a inactividad.",
      };
      // Envio el mail de notificacion
      await transporter.sendMail(mailOptions),
        (err) => {
          if (err) Logger.error(err);
        };
      // Eliminar usuario
      await usersServices.deleteById(usuario._id);
    }
    return res.status(200).json({
      message: `${usuariosInactivos.length} usuarios eliminados y notificados`,
    });
  } catch (error) {
    Logger.error("Error controller deleteUser", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
// Elimina el user que coicida con el user Id que se le pase por params
export const deleteAnUser = async (req, res) => {
  const { uid } = req.params;
  if (!uid) {
    return res.status(404).json({
      status: "error",
      message: `No se encontro ningun usuario con el id ==> ${uid}`,
    });
  }
  try {
    const userDeleted = await usersServices.deleteById(uid);
    if (!userDeleted) {
      return res.status(400).json({
        status: "error",
        message: `No se a podido eliminar el usuario con el ID:${uid}`,
      });
    }
    res.status(200).json({
      status: "succses",
      message: `Se elimino correctamente el user: ${userDeleted.email}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    Logger.error("Error en deleteAnUser controller", error);
  }
};
