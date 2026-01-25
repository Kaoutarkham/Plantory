const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const User = require("./user.model");
const PlantFactory = require("./plant.model");

const Plant = PlantFactory(sequelize, DataTypes);

User.hasMany(Plant, { foreignKey: "userId", as: "plants" });
Plant.belongsTo(User, { foreignKey: "userId", as: "owner" });

module.exports = { User, Plant, sequelize };
