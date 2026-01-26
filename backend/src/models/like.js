const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Like = sequelize.define(
  "Like",
  {},
  {
    tableName: "Likes",
    timestamps: true,
  },
);

module.exports = Like;
