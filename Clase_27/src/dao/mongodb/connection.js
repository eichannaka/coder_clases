import mongoose from "mongoose";
import 'dotenv/config'
import envConfig from "../../../envConfig.js";

const MONGO_URL = envConfig.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce'

export const initMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  };
};
