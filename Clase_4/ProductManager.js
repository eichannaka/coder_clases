const fs = require('fs');

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      // Si hay un error al cargar el archivo, se puede manejar o dejar el arreglo de productos vacío
      console.error("Error al cargar el archivo:", error);
      this.products = [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  }

  addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } =   productData;
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const codeExists = this.products.some(product => product.code === code);
    if (codeExists) {
      console.error("Ya existe un producto con ese código");
      return;
    }

    const newProduct = {
      id: this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log("Producto agregado:", newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {  
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
      console.log("Producto actualizado:", this.products[productIndex]);
    } else {
      console.error("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const updatedProducts = this.products.filter(product => product.id !== id);

    if (updatedProducts.length !== this.products.length) {
      this.products = updatedProducts;
      this.saveProducts();
      console.log("Producto eliminado con éxito");
    } else {
      console.error("Producto no encontrado");
    }
  }
}


