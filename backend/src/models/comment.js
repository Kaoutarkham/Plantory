module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "userId",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "user_id",
      },
      plantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "plantId",
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "post_id",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Comment;
};
