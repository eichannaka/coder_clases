class ProductManager {
    constructor() {
      this.products = [];
      this.autoIncrementId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const codeExists = this.products.some(product => product.code === code);
      if (codeExists) {
        console.error("Ya existe un producto con ese código");
        return;
      }
  
      // Agregar producto con id autoincrementable
      const product = {
        id: this.autoIncrementId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(product);
      console.log("Producto agregado:", product);
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
      }
    }
  }
  
  const productManager = new ProductManager();

  productManager.addProduct("Smartphone", "Potente smartphone con pantalla HD, cámara de 48MP y 128GB de almacenamiento.", 599.99, "smartphone.jpg", "S001", 100);
  productManager.addProduct("Laptop", "Laptop ultradelgada con procesador Intel i7, 16GB de RAM y SSD de 512GB.", 1299.99, "laptop.jpg", "L002", 50);
  productManager.addProduct("Smartwatch", "Smartwatch resistente al agua con monitor de frecuencia cardíaca y GPS integrado.", 149.99, "smartwatch.jpg", "W003", 75);
  
  const allProducts = productManager.getProducts();
  console.log("Todos los productos:", allProducts);
  
  const productById = productManager.getProductById(1);
  console.log("Producto por ID:", productById);