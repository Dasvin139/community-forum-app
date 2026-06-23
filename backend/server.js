require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

// Quick sanity check route — hit this first after starting the server.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Community Forum API is running" });
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// const postRoutes = require("./routes/posts");
// const commentRoutes = require("./routes/comments");
// const voteRoutes = require("./routes/votes");
// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/votes", voteRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    // sync() creates tables from your models if they don't exist yet.
    // Fine for development; for production you'd use migrations instead.
    await sequelize.sync();
    console.log("Models synced.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
