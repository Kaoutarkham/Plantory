require("dotenv").config();
const app = require("./app");
const { connectDB, sequelize } = require("./config/database");
const { DataTypes } = require("sequelize"); // Added for model initialization

// Load models
require("./models/user.model");
// Initialize plant model with sequelize and DataTypes
require("./models/plant")(sequelize, DataTypes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Test Database Connection
    await connectDB();

    // 2. Sync Models
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized (Tables created/updated).");

    // 3. Start the Express Server
    app.listen(PORT, () => {
      console.log(`
      🚀 Plantory Backend is LIVE!
      📡 Listening on: http://localhost:${PORT}
      🛠️  Environment: ${process.env.NODE_ENV || "development"}
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
