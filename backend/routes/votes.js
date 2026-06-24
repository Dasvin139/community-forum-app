const express = require("express");
const { Vote, Post } = require("../models");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// POST /api/votes/post/:postId — cast or toggle a vote (must be logged in)
// Body: { "type": "up" } or { "type": "down" }
router.post("/post/:postId", verifyToken, async (req, res) => {
  try {
    const { type } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;

    if (type !== "up" && type !== "down") {
      return res.status(400).json({ message: "type must be 'up' or 'down'" });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Look for an existing vote by this user on this post.
    // The unique index on (userId, postId) in models/Vote.js guarantees
    // there's at most one — this is the lookup that index exists for.
    const existingVote = await Vote.findOne({ where: { userId, postId } });

    if (!existingVote) {
      // No vote yet — create one
      const vote = await Vote.create({ userId, postId, type });
      return res.status(201).json({ action: "created", vote });
    }

    if (existingVote.type === type) {
      // Same vote clicked again — remove it (un-vote)
      await existingVote.destroy();
      return res.json({ action: "removed" });
    }

    // Different vote — switch it (e.g. was "up", now "down")
    existingVote.type = type;
    await existingVote.save();
    return res.json({ action: "updated", vote: existingVote });
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(500).json({ message: "Could not register vote" });
  }
});

module.exports = router;