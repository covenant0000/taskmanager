// // PublicRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// function PublicRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (token) {
//     // User logged in: redirect to homepage
//     return <Navigate to="/" replace />;
//   }

//   // User not logged in: render the children (SignUp or SignIn)
//   return children;
// }

// export default PublicRoute;



import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    // Redirect logged-in users to homepage
    return <Navigate to="/Homepage" replace />;
  }

  // Otherwise, allow access to public routes
  return children;
}

export default PublicRoute;