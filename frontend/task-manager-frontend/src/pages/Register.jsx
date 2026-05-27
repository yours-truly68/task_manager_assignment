import { useState } from "react";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <form className="space-y-4">
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
