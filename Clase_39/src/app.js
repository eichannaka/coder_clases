// Server
import express from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import session from "express-session";
// Handlebars
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
// Utils
import { __dirname } from "./utils/utils.js";
import { join } from "path";
import Logger from "./utils/winston.js";
// Rutas
import realTimeProducts from "./routes/realTimeProducts.route.js";
import cartRoute from "./routes/cart.route.js";
import productsRoute from "./routes/products.route.js";
import userRoute from "./routes/user.route.js";
import chat from "./routes/messages.route.js";
import view from "./routes/views.router.js";
import testLoggerRoute from "./routes/testLogger.router.js";
import mailerRoute from "./routes/mailer.router.js";
// Mongo DB
import "./persistencia/mongoDB/dbConfig.js";
// Passport
import passport from "passport";
import "./passport/passportStrategies.js";
// Swagger
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_COOKIE));
// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "E-Commerce-CoderHouse - API 0.1",
      description: "Proyecto backend de e-commerce de coderhouse",
      contact: { email: "ramirogumma@hotmail.com" },
      version: "0.0.1",
    },
  },
  apis: [join(__dirname, "../docs/**/*.yaml")],
};
const specs = swaggerJsdoc(swaggerOptions);
// archivos estaticos
app.use(express.static(join(__dirname, "../public")));
// Motor de plantillas\
app.set("views", join(__dirname, "../views"));
// config de hadlebars
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//inicializar passport
app.use(passport.initialize());
//Rutas
app.use("/", view);
app.use("/chat", chat);
app.use("/realtimeproducts", realTimeProducts);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/api/auth", userRoute);
app.use("/api/mailer", mailerRoute);
app.use("/loggerTest", testLoggerRoute);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// HTTP Server
const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto", 8080);
});

// Websocket server
export const socketServer = new Server(httpServer);
