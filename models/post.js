module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: true,
    }
  );
  Post.associate = (db) => {
    db.Post.hasMany(db.Comment);
  };
  return Post;
};
