import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(""); // "" means no filter, show all
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      setLoading(true);
      setError("");
      try {
        const params = category ? { category } : {};
        const response = await api.get("/posts", { params });
        if (!cancelled) setPosts(response.data);
      } catch (err) {
        if (!cancelled) setError("Could not load posts. Is the backend running?");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => {
      cancelled = true; // avoids setting state if the component unmounts mid-fetch
    };
  }, [category]); // re-fetch whenever the category filter changes

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Button
          variant={category === "" ? "default" : "outline"}
          onClick={() => setCategory("")}
        >
          All
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {loading && <p className="text-muted-foreground text-sm">Loading posts...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No posts yet{category ? ` in ${category}` : ""}. Be the first to post!
        </p>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="block border border-border rounded-md p-4 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className="font-medium">{post.category}</span>
              <span>·</span>
              <span>by {post.User?.username || "unknown"}</span>
            </div>
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {post.body}
            </p>
            <div className="text-xs text-muted-foreground mt-2">
              ▲ {post.upvotes} · ▼ {post.downvotes}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}