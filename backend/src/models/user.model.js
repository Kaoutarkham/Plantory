// 1. IMPORT the sequelize instance and DataTypes
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// 2. DEFINE the Model
const User = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING, // Matches your Register Screen
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY, // Matches your Register Screen
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING, // For the camera icon on your screen
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// 3. EXPORT the Model
module.exports = User;
