const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Plantory_db", "postgres", "kham", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  logging: false, // Set to console.log if you want to see SQL queries in terminal
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Added this function to fix the "connectDB is not a function" error
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

// EXPORT BOTH: This allows index.js to use both sequelize and connectDB
module.exports = { sequelize, connectDB };
