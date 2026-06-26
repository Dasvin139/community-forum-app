import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";

export default function CreatePost() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Protected route: if we've finished checking auth state and there's no
  // user, send them to login instead of showing the form.
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  const onSubmit = async (data) => {
    setServerError("");
    setSubmitting(true);
    try {
      const response = await api.post("/posts", data);
      navigate(`/post/${response.data.id}`);
    } catch (err) {
      const message = err.response?.data?.message || "Could not create post.";
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Avoid flashing the form before the redirect check above runs
  if (authLoading || !user) return null;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Create a post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
            {...register("category", { required: true })}
            defaultValue={CATEGORIES[0]}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Body</label>
          <textarea
            rows={6}
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            {...register("body", { required: "Body is required" })}
          />
          {errors.body && (
            <p className="text-red-600 text-xs mt-1">{errors.body.message}</p>
          )}
        </div>

        {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Post"}
        </Button>
      </form>
    </div>
  );
}