import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from './utils.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import ProductManager from './controllers/ProductManager.js';

const productManager = new ProductManager(`${__dirname}/models/products.json`)

//Express Server
const app = express(); //app es igual a la ejecucion de express
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});

//Server IO
const socketServer = new Server(httpServer);

const products = [];
socketServer.on('connection', async (socket) => { //socketServer.on es cuando se establece la conexion
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('disconnect', async () => {
        console.log('Cliente desconectado');
    });

    // socket.on('nuevoProducto', (prod) => {
    //     products.push(prod);
    //     socketServer.emit('products', products);
    // });

    socket.on('addProduct', async (prod) => {
        socketServer.emit('msgAddProduct', await productManager.addProduct(prod));
        socketServer.emit('getProducts', await productManager.getProducts());
    })

    socket.emit('getProducts', await productManager.getProducts());
})

//Static
app.use('/static', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public'));
//segunda opcion (sin asignarle param)
//app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + '/views');

//permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({ extended:true}));
//permite manejar archivos JSON
app.use(express.json());
//para visualizar detalle de las request (solicitudes) del cliente
app.use(morgan('dev'));

//permite simplificar lo que sigue luego del slash(/) y no usarlo en app.js (server)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

//Middlewares
app.use(errorHandler);







/*
//json para probar productos
{
    "title":"Mouse",
    "description": "Mouse Redragon", 
    "category": "perifericos",
    "price": 40000, 
    "thumbnail":[], 
    "code":"30", 
    "stock": 10
},
{
    "title":"Teclado",
    "description": "Teclado Redragon", 
    "category": "perifericos",
    "price": 60000, 
    "thumbnail":[], 
    "code":"20", 
    "stock": 10
},
{
    "title":"Laptop",
    "description": "Laptop Lenovo", 
    "category": "laptops",
    "price": 900000, 
    "thumbnail":[], 
    "code":"10", 
    "stock": 5
}

*/