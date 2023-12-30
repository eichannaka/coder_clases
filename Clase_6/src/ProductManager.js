const fs = require('fs'); 
class ProductManager {
    constructor() {
        this.products = []; 
        this.autoIncrementId = 1;
        this.loadProductsFromFile(); 
    }


    // Método para cargar productos desde el archivo JSON
    loadProductsFromFile() {
        try {
            const data = fs.readFileSync('./productos.json', 'utf8');
            this.products = JSON.parse(data);
            // Configurar el autoIncrementId basado en el último ID existente
            const lastProduct = this.products[this.products.length - 1];
            if (lastProduct) {
                this.autoIncrementId = lastProduct.id + 1;
            }
        } catch (error) {
            console.error('Error al leer el archivo de productos:', error);
        }
    }
    // Método para agregar productos 
    async addProduct(title, description, price, thumbnail, code, stock) {
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
        return product;
    }

    // Método para obtener todos los productos
    async getProducts(limit) {
        // Lógica para leer los productos desde el archivo si deseas persistencia
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    // Método para obtener un producto por su ID
    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            throw new Error("Producto no encontrado");
        }
    }
}

module.exports = ProductManager;
