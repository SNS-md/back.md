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
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: true,
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
