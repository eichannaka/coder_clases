import { ProductModel } from "./models/product.model.js";
export default class ProductDaoMongoDB {
    // constructor(collection, schema) {
    //     this.collection = model(collection, schema);
    // }
    getAll = async (page = 1, limit = 10, title, sort) => {
        try {
            const query = title ? { 'title': { $regex: title, $options: "i"} } : {};//regex, filtra cualquier parte del titulo, options "i" para que sea NO case sensitive (no distinga entre mayusculas o minusculas)
             
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            
            const response = await ProductModel.paginate(query, { page, limit, sort: sortOrder });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    getAllWebSocket = async () => {
        try {
            return await ProductModel.find().lean();
        }
        catch {
            throw new Error(error);
        }
    };

    getAllWebSocketPaginated = async ( page = 1, limit = 10, title, sort) => {
        try {
            const query = title ?
            {
                title: { $regex: title, $options: "i" }, //regex, filtra cualquier parte del titulo, options "i" para que sea NO case sensitive (no distinga entre mayusculas o minusculas)
            } : {};

            let order = {};
            if (sort) order.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
            return await ProductModel.paginate( query, {
                page,
                limit,
                sort: order,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    getByCategory = async (category, stock, page = 1, limit = 10, sort) => {
        try {
            const hasStock = stock ? Number(stock) : 0;
            const query = category ? 
            {
                category: {$regex: category, $options: "i" },
                stock: {$gte: hasStock },
            } : {};

            let order = {};
            if (sort) order.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
            return await ProductModel.paginate(query, {
                page,
                limit,
                sort: order,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    create = async (product) => {
        try {
            return await ProductModel.create(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    update = async (id, obj) => {
        try {
            return await ProductModel.findByIdAndUpdate(id, obj, {new: true});
        } catch (error) {
            throw new Error(error);
        }
    }

    delete = async (id) => {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteAll = async () => {
        try {
            return await ProductModel.deleteMany({});
        } catch (error) {
            throw new Error(error);
        }
    }

}