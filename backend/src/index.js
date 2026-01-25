require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/database");
const { sequelize } = require("./models/index"); 
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Serving static files with absolute pathing
// This allows http://localhost:3000/uploads/filename.jpg to work
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const startServer = async () => {
  try {
    await connectDB();

    // Sync models and relationships established in models/index.js
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized.");

    app.listen(PORT, () => {
      console.log(`
      🚀 Plantory Backend is LIVE
      📡 Listening on: http://localhost:${PORT}
      🖼️  Images: http://localhost:${PORT}/uploads/
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Stop process if DB connection fails
  }
};

startServer();