import { useState, useContext } from "react";

import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService.js";
import { AuthContext } from "../context/AuthContext.jsx";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: username,
      email,
      password,
    };

    try {
      const data = await registerUser(userData);

      console.log(data);

      const loginData = await loginUser({
        email,
        password,
      });

      login(loginData.access_token);

      toast.success("Registration successful");
      navigate("/dashboard");
      // Redirect to login page after successful registration
    } catch (error) {
      console.log(error);
      toast.error("Registration failed: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
