const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const User = require("./user.model"); 
const PlantFactory = require("./plant.model");
const Like = require("./like"); 
const Comment = require("./comment"); 

const Plant = PlantFactory(sequelize, DataTypes);

User.hasMany(Plant, { foreignKey: "userId", as: "plants" });
Plant.belongsTo(User, { foreignKey: "userId", as: "owner" });

User.hasMany(Like, { foreignKey: "userId", as: "likes" });
Like.belongsTo(User, { foreignKey: "userId" });

Plant.hasMany(Like, { foreignKey: "plantId", as: "plantLikes" });
Like.belongsTo(Plant, { foreignKey: "plantId" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId" });

Plant.hasMany(Comment, { foreignKey: "plantId", as: "plantComments" });
Comment.belongsTo(Plant, { foreignKey: "plantId" });

module.exports = { User, Plant, Like, Comment, sequelize };
