const mongoose = require("mongoose");
let dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
    // mongoose.connect(
    //   "mongodb+srv://kumarhritik158:6MvICOqyNKX5HJt2@cluster0.ck0vxyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // );
    console.log("Databsae connected");
  } catch (error) {
    console.log("Error cannot connect to the server :", err);
    process.exit(1);
  }
};

module.exports = connectDb;
