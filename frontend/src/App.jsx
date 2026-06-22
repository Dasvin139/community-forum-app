import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import CreatePost from "@/pages/CreatePost";
import PostDetail from "@/pages/PostDetail";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-border px-6 py-3">
      <Link to="/" className="font-semibold">
        Community Forum
      </Link>
      <div className="flex gap-2">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign up</Button>
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </AuthProvider>
  );
}
