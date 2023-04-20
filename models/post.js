const moment = require("moment-timezone");
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
      date: {
        type: DataTypes.DATE,
        defaultValue: moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: false,
    }
  );
  Post.associate = (db) => {
    db.Post.hasMany(db.Comment);
  };
  return Post;
};
