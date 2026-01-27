const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

// Create empty db object
const db = {};

// Add sequelize instances
db.sequelize = sequelize;
db.Sequelize = require("sequelize");

// Initialize models - DO NOT import factories at top
db.User = require("./user.model")(sequelize, DataTypes);
db.Plant = require("./plant.model")(sequelize, DataTypes);
db.Like = require("./like")(sequelize, DataTypes);
db.Comment = require("./comment")(sequelize, DataTypes);
db.Post = require("./post")(sequelize, DataTypes);
db.SavedPost = require("./savedPost")(sequelize, DataTypes);

// Setup associations in a function that runs later
const setupAssociations = () => {
  const { User, Plant, Like, Comment, Post, SavedPost } = db;

  // PLANTS associations
  User.hasMany(Plant, { foreignKey: "userId", as: "plants" });
  Plant.belongsTo(User, { foreignKey: "userId", as: "owner" });

  User.hasMany(Like, { foreignKey: "userId", as: "plantLikes" });
  Like.belongsTo(User, { foreignKey: "userId", as: "user" });

  Plant.hasMany(Like, { foreignKey: "plantId", as: "likes" });
  Like.belongsTo(Plant, { foreignKey: "plantId", as: "plant" });

  User.hasMany(Comment, { foreignKey: "userId", as: "plantComments" });
  Comment.belongsTo(User, { foreignKey: "userId", as: "commentUser" });

  Plant.hasMany(Comment, { foreignKey: "plantId", as: "comments" });
  Comment.belongsTo(Plant, { foreignKey: "plantId", as: "plant" });

  // POSTS associations
  User.hasMany(Post, { foreignKey: "user_id", as: "posts" });
  Post.belongsTo(User, { foreignKey: "user_id", as: "user" });

  Post.hasMany(Like, { foreignKey: "post_id", as: "postLikes" });
  Like.belongsTo(Post, { foreignKey: "post_id", as: "post" });

  User.hasMany(SavedPost, { foreignKey: "user_id", as: "saved_posts" });
  SavedPost.belongsTo(User, { foreignKey: "user_id", as: "user" });

  Post.hasMany(SavedPost, { foreignKey: "post_id", as: "saves" });
  SavedPost.belongsTo(Post, { foreignKey: "post_id", as: "post" });

  Post.hasMany(Comment, { foreignKey: "post_id", as: "postComments" });
  Comment.belongsTo(Post, { foreignKey: "post_id", as: "commentPost" });
};

// Run associations immediately
setupAssociations();

// Export destructured models for easier importing
module.exports = {
  User: db.User,
  Plant: db.Plant,
  Like: db.Like,
  Comment: db.Comment,
  Post: db.Post,
  SavedPost: db.SavedPost,
  sequelize: db.sequelize,
};
