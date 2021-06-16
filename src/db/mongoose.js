require("dotenv").config();
const mongoose = require("mongoose");
const mongodbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ysk-api";

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
