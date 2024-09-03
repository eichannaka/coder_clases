import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, max: 30, index: true},
    description: { type: String, require: true, index: true},
    price: { type: Number, require: true },
    img: [String],
    code: { type: String, unique: true },
    stock: { type: Number, require: true },
    category: {
        type: String,
        enum: {
            values: [
                'Periféricos',
                'Laptop',
                'PC',
                'Accesorios',
                'Tablets',
                'Celulares',
                'Otros'
            ],
            message: '{VALUE} no es una categoría válida',
        },
        require: true,
        index: true,
    },
    status: {type: Boolean, default: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(
    productCollection, 
    productSchema
);

