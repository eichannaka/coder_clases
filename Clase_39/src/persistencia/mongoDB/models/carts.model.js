import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: { type: Number, default: 1 },
      total: { type: Number, default: 0 },
    },
  ],
});
cartsSchema.pre("findOne", function (next) {
  this.populate("products._id");
  next();
});
cartsSchema.pre("find", function (next) {
  this.populate("products._id");
  next();
});
export const cartsModel = mongoose.model("Carts", cartsSchema);
