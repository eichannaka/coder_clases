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
    products: [{ type: Schema.Types.Mixed, required: true }],
    purchaser: { type: String, required: true } // Email del usuario asociado al carrito
});

export const TicketModel = model(
    ticketCollection, 
    ticketSchema
);
