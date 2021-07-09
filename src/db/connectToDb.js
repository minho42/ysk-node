import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectToDb = () => {
  const mongodbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ysk-api";
  mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
