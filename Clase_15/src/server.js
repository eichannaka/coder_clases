import { initMongoDB } from './dao/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js';
import 'dotenv/config';
import { configureSocket } from './socketConfig.js';
import productsRouter from './routes/producst.router.js';
import cartsRouter from './routes/carts.router.js';
//import chatRouter from './routes/chat.router.js';
import { __dirname } from './utils.js';

//express
const app = express(); //app es igual a la ejecucion de express
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});

//Socket.io
//configureSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'));

//morgan
app.use(morgan('dev'));

app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
//app.use("/chat", chatRouter)

//app.use("/products", productsRouter);

//middlewares
app.use(errorHandler);

if (process.env.PERSISTENCE === 'MONGO') initMongoDB();