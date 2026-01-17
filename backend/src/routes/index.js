require("dotenv").config(); // Loads your .env variables
const app = require("./app");
const { connectDB, sequelize } = require("./config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Test Database Connection
    await connectDB();

    // 2. Sync Models (Optional: creates tables if they don't exist)
    // await sequelize.sync({ alter: true });

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
    process.exit(1); // Stop the app if DB connection fails
  }
};

startServer();
