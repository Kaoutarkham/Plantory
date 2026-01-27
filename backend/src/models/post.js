module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hashtags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comments_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "posts",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Post;
};
