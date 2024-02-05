// Definir rutas para carritos
const { Router } = require('express');
const { convertToNumber } = require('../middlewares/convert-to-number.middlewares');
const uploader = require('../utils/multer.util');

const cartsRouter = Router()

const carts = [];
// Crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = {
      id: Number(`${Date.now()}${Math.floor(Math.random() * 100)}`),
      products: [],
    };
    carts.push(newCart);
    res.json({ cart: newCart, message: 'Carrito creado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener productos de un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json({ cart: cart, message: 'Productos en el carrito obtenidos correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener carrito
cartsRouter.get('/', async (req, res) => {
  try {
    res.json({ payload: carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Agregar un producto a un carrito por ID
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const { quantity } = req.body;

    console.log(typeof quantity);

    // Verificar si el carrito existe
    const cart = carts.find(cart => cart.id === cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(product => product.id === productId);
    if (existingProduct) {
      // Si el producto ya existe, incrementar la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si el producto no existe, agregarlo al carrito
      cart.products.push({ id: productId, quantity: quantity });
    }
    res.json({ cart: cart, message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = cartsRouter