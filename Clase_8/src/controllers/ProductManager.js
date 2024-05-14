import fs from 'fs';
const path = './src/db/products.json';

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

