const { DataTypes } = require("sequelize");
// CHANGE THIS LINE: Add { } around sequelize
const { sequelize } = require("../config/database"); 

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
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

User.associate = (models) => {
  User.hasMany(models.Plant, { foreignKey: "userId", as: "plants" });
};

module.exports = User;