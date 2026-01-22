const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const plantRoutes = require("./routes/plant.routes"); // Don't forget this!
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Static Folder for Images
// This allows your React Native app to see the plant photos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 3. Routes
app.use("/api/users", userRoutes); // Login, Register, Profile
app.use("/api/plants", plantRoutes); // Add Plant, Get Plants

// 4. Error Handler
app.use(errorHandler);

module.exports = app;
