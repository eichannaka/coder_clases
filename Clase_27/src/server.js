import express from 'express';
import { initMongoDB } from './dao/mongodb/connection.js';
import morgan from 'morgan'
import {errorHandler} from './middlewares/errorHandler.js';
import 'dotenv/config';
import { configureSocket} from './socketConfig.js';
import router from './routes/index.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import "dotenv/config";
import cookieParser from "cookie-parser";
import session, { Cookie } from 'express-session'; 
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import './passport/google-strategy.js';
import './passport/jwt-strategy.js'
import config from '../envConfig.js';

//express
const app = express(); //app es igual a la ejecucion de express
const PORT = config.PORT;


// Inicio Mongo Store
const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        // crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: config.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

//Configuracion de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'));
//morgan
app.use(morgan('dev'));
//middleware de manejo de errores
app.use(errorHandler);
//middleware de cookie parser
app.use(cookieParser(config.COOKIE_KEY)) //queda disponible para cualquier parte de la app
//Se inicia middleware express-session
app.use(session(storeConfig))

//Configuracion de motor de plantillas Handlebars
app.engine("handlebars", engine()); // Vamos a usar handlebars le decimos al servidor y se ejecuta a traves de la funcion engine()
app.set("view engine", "handlebars"); // Nuestros views van a tener extension handlebars
app.set("views", __dirname + '/views'); // Dentro de la carpeta wiews

//crear servidor http
const httpServer = app.listen(PORT, () => { 
    console.log(`🚀 Server listening on port ${PORT} in ${config.NODE_ENV} mode`)
});

//Socket.io
configureSocket(httpServer);

// Passport, debe ir antes de las rutas
app.use(passport.initialize());
app.use(passport.session());

//Configurar rutas
app.use('/', router);

//Inicializar MongoDB
if(config.PERSISTENCE === 'MONGO') initMongoDB();