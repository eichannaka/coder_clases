import { Schema, model } from "mongoose";

// Generador de códigos únicos
const generateUniqueCode = () => {
    return 'TICKET-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};

const ticketCollection = "tickets";

const ticketSchema = new Schema({
    code: { type: String, unique: true, default: generateUniqueCode },
    purchase_datetime: { type: Date, default: Date.now }, 
    amount: { type: Number, required: true, default: 0 },
    purchaser: { type: String, required: true, unique: true } // Email del usuario asociado al carrito
});

export const ticketModel = model(ticketCollection, ticketSchema);
