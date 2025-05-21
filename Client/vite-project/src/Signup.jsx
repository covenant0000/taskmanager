import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "./api";
import './signup.css';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", { username: name, email, password });

      // ✅ No token is saved
      // ✅ Redirect to login page
      setError(null);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Sign Up</button>
        
        <p>Already have an account? <NavLink to="/signin">Sign In</NavLink></p>
      </form>
    </div>
  );
}

export default SignUp;