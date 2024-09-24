import { transporter } from "../utils/nodeMailer.js";
import Logger from "../utils/winston.js";
import usersServices from "../services/users.services.js";
import recoveryServices from "../services/recovery.services.js";
export const recoveryPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const verifyUser = await usersServices.getUserByEmail(email);
    if (!verifyUser) {
      res.status(400).json({
        status: "error",
        message: "No se encontro un usuario con ese email",
      });
    }
    const userId = verifyUser._id;
    const newRecovery = {
      user_id: userId,
    };
    const recoveryDateStart = await recoveryServices.addExpiresDate(
      newRecovery
    );
    const message = transporter.sendMail(
      {
        from: "Coder-E-Comerce",
        to: email,
        subject: "Cohder-E-Commerce Pass-Recovery",
        text: "Haga click en el link para poder recuperar la contraseña",
        html: `<div><h1>Informacion de backend</h1><a href='http://localhost:8080/api/auth/recovery/${userId}'>Click para recuperar tu contraseña</a></div>`,
      },

      (err, info) => {
        if (err) Logger.error(err);
        if (info) {
          Logger.info("Enviado a:", info.accepted);
        }
      }
    );
    res
      .status(200)
      .json({ status: "succses", message: "Revise su casilla de correo" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "No se pudo enviar el correo" });
    Logger.error("recoveryPassword controller", error);
  }
};
