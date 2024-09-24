import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const aplication_gmail_password = process.env.PASS_APP;
const email_owner = process.env.USER;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email_owner,
    pass: aplication_gmail_password,
  },
  tls: { rejectUnauthorized: false },
});
