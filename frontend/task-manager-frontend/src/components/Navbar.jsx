import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>

      <button
        onClick={handleLogout}
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
