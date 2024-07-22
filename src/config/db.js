const mongoose = require("mongoose");
let dotenv = require("dotenv").config();

const connectDb = async () => {
  const DB_URL = process.env.MONGODB_URL;
  try {
    mongoose.connect(DB_URL);
    console.log("Databsae connected");
  } catch (error) {
    console.log("Error cannot connect to the server :", err);
    process.exit(1);
  }
};

module.exports = connectDb;
