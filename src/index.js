const express = require("express");
let dotenv = require("dotenv").config();

const connectDB = require("./config/db.js");
console.log("PORT", process.env.PORT);
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/tasksRoutes.js");

// connect DB
connectDB();

//initialise express instance
const app = express();

// to convert all request bodies into json format
app.use(express.json());

// health check API
app.get("/health", (req, res) => {
  res.json({ message: "Healthy, API is working fine" });
});

//user routes
app.use("/api/user", userRoutes);
//task routes
// app.use("/api/", taskRoutes);

// start server
app.listen(PORT, () => {
  console.log("app is listening at port:", PORT);
});
