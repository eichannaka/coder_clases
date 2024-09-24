import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: new Date(),
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  },
});

export const ticketModel = mongoose.model("Tickets", ticketSchema);
