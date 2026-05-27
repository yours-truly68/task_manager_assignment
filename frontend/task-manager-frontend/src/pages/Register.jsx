import { useState, useContext } from "react";

import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

import { Link, useNavigate } from "react-router-dom";

import { registerUser, loginUser } from "../services/authService.js";

import { AuthContext } from "../context/AuthContext.jsx";

import toast from "react-hot-toast";

function Register() {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

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

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");

      return;
    }

    // USERNAME VALIDATION
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");

      return;
    }

    const userData = {
      name: username,
      email,
      password,
    };

    try {
      setLoading(true);

      // REGISTER USER
      await registerUser(userData);

      // AUTO LOGIN AFTER REGISTER
      const loginData = await loginUser({
        email,
        password,
      });

      login(loginData.access_token);

      toast.success("Registration successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8f5ff] to-[#fdf2f8] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/40">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Start managing your tasks efficiently
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
