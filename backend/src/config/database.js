const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Plantory_db", "postgres", "kham", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  logging: console.log, 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
