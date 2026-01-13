const sequelize = require("./config/database");

sequelize
  .authenticate()
  .then(() => console.log("DB connected with Sequelize"))
  .catch((err) => console.error("DB error:", err));
