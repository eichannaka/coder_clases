import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [{
        type: Array,
        required: true
    }]
})

export const CartModel = mongoose.model(
    cartCollection,
    cartSchema
);