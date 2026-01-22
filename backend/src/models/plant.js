"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // This links the plant back to the User
      // Each plant "belongs to" one specific user
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "owner",
      });
    }
  }

  Plant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // A plant should always have a name
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, in case they don't have a photo yet
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Every plant MUST belong to a user
        references: {
          model: "Users", // Name of the table in pgAdmin
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Plant",
      tableName: "Plants", 
      timestamps: true, //
    },
  );

  return Plant;
};
