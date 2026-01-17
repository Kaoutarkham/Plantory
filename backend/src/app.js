const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Main Route
app.use("/api/users", userRoutes);

// Basic Health Check
app.get("/", (req, res) => {
  res.send("Plantory API is running...");
});

module.exports = app; // <--- THIS LINE IS ESSENTIAL
