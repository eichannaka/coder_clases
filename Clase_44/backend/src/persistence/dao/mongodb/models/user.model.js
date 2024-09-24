import { Schema, model } from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique: true}, 
    age: { type: Number }, //temporalmente borre el required:true
    password: { type: String, required: true},
    role: { type : String, default: 'user'},
    image: { type: String },
    isGithub: { type : Boolean, default: false },
    isGoogle: { type : Boolean, default: false },
    cart: { type: Schema.Types.ObjectId, ref: "carts", default: null },
    last_connection: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.pre(["find", "findOne"], function() {
    this.populate("cart");
})

export const UserModel = model(userCollection, userSchema);