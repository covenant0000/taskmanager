// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import './signup.css';

// function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     // Simulate successful login: set token in localStorage
//     localStorage.setItem("token", "test-token");

//     // Redirect to homepage
//     navigate('/');
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <button type="submit">Sign In</button>

//         <p>
//           Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignIn;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "./api";  // import your api helper
import './signup.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setError(null);
      navigate("/home"); // redirect to protected route after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Sign In</button>

        <p>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </form>
    </div>
  );
}

export default SignIn;