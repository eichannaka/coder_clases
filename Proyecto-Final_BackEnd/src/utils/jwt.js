import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretJwt = process.env.SECRET_JWT;
export const generateToken = (user) => {
  const token = jwt.sign({ user }, secretJwt, { expiresIn: "1h" });
  return token;
};
