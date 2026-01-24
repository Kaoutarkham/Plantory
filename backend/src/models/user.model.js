const { DataTypes } = require("sequelize");
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
      type: DataTypes.DATEONLY, // Format YYYY-MM-DD
      allowNull: true,
    },
    // Nom identique à ta colonne dans pgAdmin
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Users", // Important pour matcher ton pgAdmin
    timestamps: true,
  },
);

// Relation avec les plantes pour ton écran profil
User.associate = (models) => {
  User.hasMany(models.Plant, { foreignKey: "userId", as: "plants" });
};

module.exports = User;
