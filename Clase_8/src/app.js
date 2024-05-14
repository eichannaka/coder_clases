import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from './path.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express(); //app es igual a la ejecucion de express

const PORT = 8080

//convierto una carpeta en un recurso estatico
app.use('/static', express.static(__dirname + '/public'))
//segunda opcion (sin asignarle param)
//app.use(express.static(__dirname + '/public'));

//permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({ extended:true}));
//permite manejar archivos JSON
app.use(express.json());
//para visualizar detalle de las request (solicitudes) del cliente
app.use(morgan('dev'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//Middlewares
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})
