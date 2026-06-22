const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      // Keep this a plain string for now (e.g. "Tech", "Career", "Random").
      // A hardcoded list on the frontend is enough for Day 1 scope.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "General",
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);

module.exports = Post;
