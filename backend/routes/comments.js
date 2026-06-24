const express = require("express");
const { Comment, User, Post } = require("../models");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/comments/post/:postId — list comments for a given post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [{ model: User, attributes: ["id", "username"] }],
      order: [["createdAt", "ASC"]],
    });

    res.json(comments);
  } catch (err) {
    console.error("List comments error:", err.message);
    res.status(500).json({ message: "Could not fetch comments" });
  }
});

// POST /api/comments/post/:postId — add a comment to a post (must be logged in)
router.post("/post/:postId", verifyToken, async (req, res) => {
  try {
    const { body } = req.body;
    const { postId } = req.params;

    if (!body) {
      return res.status(400).json({ message: "Comment body is required" });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      body,
      postId,
      userId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("Create comment error:", err.message);
    res.status(500).json({ message: "Could not create comment" });
  }
});

module.exports = router;