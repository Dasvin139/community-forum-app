import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const [voting, setVoting] = useState(false);
  const [voteError, setVoteError] = useState("");

  async function fetchPost() {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (err) {
      setError("Could not load this post.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentError("");
    setSubmittingComment(true);
    try {
      await api.post(`/comments/post/${id}`, { body: commentText });
      setCommentText("");
      await fetchPost();
    } catch (err) {
      const message = err.response?.data?.message || "Could not add comment.";
      setCommentError(message);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleVote = async (type) => {
    if (!user) return; // shouldn't happen since buttons are hidden when logged out
    setVoteError("");
    setVoting(true);
    try {
      await api.post(`/votes/post/${id}`, { type });
      await fetchPost(); // refetch so the new vote counts show immediately
    } catch (err) {
      const message = err.response?.data?.message || "Could not register vote.";
      setVoteError(message);
    } finally {
      setVoting(false);
    }
  };

  if (loading) return <p className="p-6 text-sm text-muted-foreground">Loading...</p>;
  if (error) return <p className="p-6 text-sm text-red-600">{error}</p>;
  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <span className="font-medium">{post.category}</span>
        <span>·</span>
        <span>by {post.User?.username || "unknown"}</span>
      </div>

      <h1 className="text-xl font-semibold">{post.title}</h1>
      <p className="mt-2 whitespace-pre-wrap">{post.body}</p>

      <div className="flex items-center gap-3 mt-3">
        {user ? (
          <>
            <Button
              variant="outline"
              onClick={() => handleVote("up")}
              disabled={voting}
            >
              ▲ {post.upvotes}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleVote("down")}
              disabled={voting}
            >
              ▼ {post.downvotes}
            </Button>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">
            ▲ {post.upvotes} · ▼ {post.downvotes} —{" "}
            <Link to="/login" className="text-primary underline">
              log in to vote
            </Link>
          </span>
        )}
      </div>
      {voteError && <p className="text-red-600 text-sm mt-1">{voteError}</p>}

      <hr className="my-6 border-border" />

      <h2 className="font-semibold mb-3">
        Comments ({post.Comments?.length || 0})
      </h2>

      <div className="space-y-3 mb-6">
        {post.Comments?.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
        {post.Comments?.map((comment) => (
          <div key={comment.id} className="border border-border rounded-md p-3">
            <div className="text-xs text-muted-foreground mb-1">
              {comment.User?.username || "unknown"}
            </div>
            <p className="text-sm">{comment.body}</p>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleAddComment} className="space-y-2">
          <textarea
            rows={3}
            placeholder="Add a comment..."
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          {commentError && <p className="text-red-600 text-sm">{commentError}</p>}
          <Button type="submit" disabled={submittingComment}>
            {submittingComment ? "Posting..." : "Comment"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link to="/login" className="text-primary underline">
            Log in
          </Link>{" "}
          to leave a comment.
        </p>
      )}
    </div>
  );
}