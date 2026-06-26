import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setSubmitting(true);
    try {
      await signup(data.username, data.email, data.password);
      navigate("/"); // back to home feed after successful signup
    } catch (err) {
      // The backend sends { message: "..." } on 409 (email taken), etc.
      const message = err.response?.data?.message || "Signup failed. Try again.";
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Sign up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-border rounded-md px-3 py-2 text-sm"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-600 text-sm">{serverError}</p>
        )}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing up..." : "Sign up"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline">
          Log in
        </Link>
      </p>
    </div>
  );
}