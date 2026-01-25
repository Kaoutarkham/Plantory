const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    birthday: { type: DataTypes.DATEONLY },
    profileImage: { type: DataTypes.STRING },
  },
  {
    tableName: "Users",
    timestamps: true,
  },
);

module.exports = User;
