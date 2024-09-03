import { Schema, model } from "mongoose";

const userMockSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export const UserMockModel = model("usersMock", userMockSchema);