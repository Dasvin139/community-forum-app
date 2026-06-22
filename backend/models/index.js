const sequelize = require("../config/database");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Vote = require("./Vote");

// ---- Associations ----

// A User has many Posts, Comments, Votes
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Vote, { foreignKey: "userId", onDelete: "CASCADE" });
Vote.belongsTo(User, { foreignKey: "userId" });

// A Post has many Comments and Votes
Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });

Post.hasMany(Vote, { foreignKey: "postId", onDelete: "CASCADE" });
Vote.belongsTo(Post, { foreignKey: "postId" });

// One vote per user per post — enforced by the unique index on the Vote model
// (see models/Vote.js). On Day 3 you'll look up an existing vote first, then
// create/update/delete it instead of just creating blindly.

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Vote,
};
