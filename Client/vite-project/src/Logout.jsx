import React from "react";
import { useNavigate } from "react-router-dom";
import "./logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Optional: clear any other user-related data if you store any

    // Redirect to signup page after logout
    navigate("/signup", { replace: true });
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;