require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models/user.model");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// 1. GLOBAL MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. STATIC FOLDER (This makes your uploaded images viewable in a browser)
// Example: http://localhost:3000/uploads/12345.jpg
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 3. ROUTES
app.use("/api/users", userRoutes);

// 4. ERROR HANDLING (This must be AFTER routes)
app.use(errorHandler);

// 5. DATABASE SYNC & SERVER START
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true }) // 'alter' updates your tables if you change the model
  .then(() => {
    console.log("✅ Database synchronized (Columns updated).");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });
