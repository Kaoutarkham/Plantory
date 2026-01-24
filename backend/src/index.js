require("dotenv").config();
const app = require("./app");
const { connectDB, sequelize } = require("./config/database");
const { DataTypes } = require("sequelize");
const path = require("path");
const express = require("express");

// 1. Initialisation des modèles
const User = require("./models/user.model");
const PlantModel = require("./models/plant");
const Plant = PlantModel(sequelize, DataTypes);

// 2. DÉFINITION DES ASSOCIATIONS (Version Robuste)
// On utilise les instances directes pour corriger l'erreur 'Include unexpected'
User.hasMany(Plant, { foreignKey: "userId", as: "plants" });
Plant.belongsTo(User, { foreignKey: "userId", as: "user" });

// 3. Middlewares pour les fichiers statiques
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connexion à la base de données PostgreSQL
    await connectDB();

    // Synchronisation des tables sans perte de données
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized.");

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`
      🚀 Plantory Backend is LIVE!
      📡 Listening on: http://localhost:${PORT}
      🛠️  Environment: development
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
