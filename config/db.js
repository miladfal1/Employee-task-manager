const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/crud1402");
    console.log("connected to db");
  } catch (err) {
    console.log("cant connect to db");
  }
};

module.exports = connectDB;
