const { Router } = require('express');
const fs = require('fs/promises'); // Módulo fs para manejo de archivos

const productsRouter = Router();
const PRODUCTS_FILE_PATH = 'src/json/productos.json'; 

const products = [];

// Obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const productsData = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    const products = JSON.parse(productsData);
    res.json({ payload: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
  try {
    const productsData = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    const products = JSON.parse(productsData);

    const productId = parseInt(req.params.pid, 10);
    const product = products.find(product => product.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ payload: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Agregar un nuevo producto con cantidad de uno en uno
productsRouter.post('/', async (req, res) => {
  try {
    const { title, description, code, price, stock, category, quantity } = req.body;

    if (!title || !description || !code || !price || !stock || !category || quantity === undefined) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados, incluyendo la cantidad.' });
    }

    let existingProducts = [];

    try {
      const productsData = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
      existingProducts = JSON.parse(productsData);

      if (!Array.isArray(existingProducts)) {
        existingProducts = [];
      }
    } catch (readError) {
      res.status(500).json({ readError: 'Error' });
    }

    for (let i = 0; i < quantity; i++) {
      const newProduct = {
        id: Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        quantity: 1,  // Establecemos la cantidad a 1 para cada producto individual
        thumbnails: process.cwd() + '/src/images' + [],
      };

      existingProducts.push({ ...newProduct });
    }

    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(existingProducts, null, 2), 'utf-8');

    res.json({ message: `Producto agregado correctamente ${quantity} veces.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



productsRouter.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;

    const productsData = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    let products = JSON.parse(productsData);

    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');

    res.json({ product: products[productIndex], message: 'Producto actualizado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
// Eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    const productsData = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    let products = JSON.parse(productsData);

    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');

    res.json({ product: deletedProduct, message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = productsRouter;
