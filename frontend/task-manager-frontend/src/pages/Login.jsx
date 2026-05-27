import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD VALIDATION
    const passwordRegex = /^(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and contain a number",
      );

      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      setLoading(true);

      const data = await loginUser(userData);

      login(data.access_token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8f5ff] to-[#fdf2f8] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to manage your tasks
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
