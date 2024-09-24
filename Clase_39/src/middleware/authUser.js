import Logger from "../utils/winston.js";
export const verifyAdminUser = (req, res, next) => {
  const { user } = req;
  try {
    if (!user) {
      const response = "Usuario no validado";
      return res
        .status(401)
        .json({ status: "User no valido", message: response });
    }
    if (user.role === "admin" || "premium") {
      next();
    } else {
      const response = "Solo los administradores pueden ingresar";
      return res
        .status(401)
        .json({ status: "No autorizado", message: response });
    }
  } catch (error) {
    Logger.error(error);
    return error;
  }
};
