const moment = require("moment-timezone");
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: () => moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: false,
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
