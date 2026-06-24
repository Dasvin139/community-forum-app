const express = require("express");
const { Post, User, Comment, Vote } = require("../models");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/posts — list all posts, optionally filtered by ?category=
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};

    const posts = await Post.findAll({
      where,
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Vote, attributes: ["type"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Attach a simple upvotes/downvotes count to each post for the frontend
    const postsWithCounts = posts.map((post) => {
      const upvotes = post.Votes.filter((v) => v.type === "up").length;
      const downvotes = post.Votes.filter((v) => v.type === "down").length;
      const { Votes, ...postData } = post.toJSON();
      return { ...postData, upvotes, downvotes };
    });

    res.json(postsWithCounts);
  } catch (err) {
    console.error("List posts error:", err.message);
    res.status(500).json({ message: "Could not fetch posts" });
  }
});

// GET /api/posts/:id — one post with comments and vote counts
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Vote, attributes: ["type", "userId"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "username"] }],
          order: [["createdAt", "ASC"]],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const upvotes = post.Votes.filter((v) => v.type === "up").length;
    const downvotes = post.Votes.filter((v) => v.type === "down").length;
    const { Votes, ...postData } = post.toJSON();

    res.json({ ...postData, upvotes, downvotes });
  } catch (err) {
    console.error("Get post error:", err.message);
    res.status(500).json({ message: "Could not fetch post" });
  }
});

// POST /api/posts — create a post (must be logged in)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, body, category } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "title and body are required" });
    }

    const post = await Post.create({
      title,
      body,
      category: category || "General",
      userId: req.user.id, // comes from the decoded JWT, set by verifyToken
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err.message);
    res.status(500).json({ message: "Could not create post" });
  }
});

module.exports = router;