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

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData);

      login(data.access_token);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
