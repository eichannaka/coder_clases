import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || process.argv.slice(2)[0] || 'dev'; // 'development' por defecto

dotenv.config({ path: ENV === 'prod' ? './.env.prod' : './.env.dev' });

export default {
    NODE_ENV: ENV,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    COOKIE_KEY: process.env.COOKIE_KEY,
    PERSISTENCE: process.env.PERSISTENCE,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    CLIENT_ID_GOOGLE: process.env.CLIENT_ID_GOOGLE,
    CLIENT_SECRET_GOOGLE: process.env.CLIENT_SECRET_GOOGLE,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN,
    REACT_APP: process.env.REACT_APP,
    EMAIL_GMAIL: process.env.EMAIL_GMAIL,
    PASSWORD_GMAIL: process.env.PASSWORD_GMAIL,
    APP_URL: process.env.APP_URL,
    PORT_GMAIL: process.env.PORT_GMAIL,
};