const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vote = sequelize.define(
  "Vote",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      // "up" or "down". One vote per user per post (enforced in models/index.js).
      type: DataTypes.ENUM("up", "down"),
      allowNull: false,
    },
  },
  {
    tableName: "votes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "postId"],
      },
    ],
  }
);

module.exports = Vote;
