import fs from 'fs';
const path = './src/models/products.json';

class Product {
    constructor(title, description, category, price, thumbnail, code, stock, status){
        this.id = Product.addId(),
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
    }
    //genero id autoincromentable
    static addId(){
        if(this.idIncremental){
            this.idIncremental ++;
        } else {
            this.idIncremental = 1;
        }
        return this.idIncremental;
    }
}

export default class ProductManager {
    constructor(path){
    this.path = path;
    }
    addProduct = async(obj) => {
        try {
            //obtengo productos actuales
            let products = await this.getProducts();
            //verifico codigo que no este repetido
            if(products.some(p => p.code === obj.code)){
                console.log(`el codigo de producto ${obj.code} ya existe`);
                return;
            }
            //verifico que todos los campos esten completados
            if(Object.values(products).includes("") || Object.values(products).includes(null)){
                console.log("Los campos no pueden estar vacios");
                return;
            }
            //agrego nuevo producto 
            const product = new Product(obj.title, obj.description, obj.category, obj.price, obj.thumbnail, obj.code, obj.stock, obj.status=true); //uso la clase Product para que genere ID único para c/produco
            const productExist = products.find(p => p.id === product.id)
            if(productExist) return null
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }        
    }

    getProducts = async() => {
        try {
            if(fs.existsSync(this.path)){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                let aux = JSON.parse(products);
                return aux;
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async(productId) => {
        try {
            const products = await this.getProducts();
            const productExist = products.find(product => product.id === productId);
            if(productExist){
                return productExist;
            } else {
                //console.log('No existe producto');
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async(productId, newProductData) => {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(p => p.id === productId);
            if(index=== -1){
                console.log(`No existe producto con id: ${productId}`);
                return null;
            }
                
            const product = products[index];
            products[index] = {...product, ...newProductData}; //actualiza el producto con los nuevos datos
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log(`se actualizo producto con id ${productId}`);
            return products[index];
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async(productId) => {
        try {
            const products = await this.getProducts();
            if(products.length > 0) {
                const productExist = await this.getProductById(productId);
                if(productExist){
                    const product = products.filter(p => p.id !== productId);
                    await fs.promises.writeFile(path, JSON.stringify(product));
                    console.log(`producto con id ${productId} eliminado`);
                    return product;
                } else {
                    return null;
                }
            } return null;
        } catch (error) {
            console.log(error);
        }
    }

}

// //instancio ProductManager
// const productManager = new ProductManager(path);

// //instancio Product
// const product1 = new Product("Laptop", "informatica",v"Laptop Lenovo", 900000, "https://www.nextclick.com.ar/Temp/App_WebSite/App_PictureFiles/Items/0196804274027_800.jpg", "10", 5, true);
// const product2 = new Product("Teclado", "informatica", "Teclado Redragon", 60000, "https://redragon.es/content/uploads/2021/05/K552-KR-SPS-KUMARA-RAINBOW-SPAIN1.png", "20", 10, true);
// const product3 = new Product("Mouse", "informatica", "Mouse Redragon", 40000, "https://redragon.es/content/uploads/2021/04/GRIFFIN-B.png", "30", 10, true);


// const test = async() => {
//     //creo archivo JSON vacio
//     await fs.promises.writeFile(path, "[]");
//     //listo array de productos que deberia estar vacio
//     console.log(await productManager.getProducts());
//     //agrego productos
//     await productManager.addProduct(product1);
//     await productManager.addProduct(product2);
//     await productManager.addProduct(product3);
// }

// test();