import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/ysk-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
