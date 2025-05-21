import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem('token');
      return <Navigate to="/signup" replace />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/signup" replace />;
  }
}

export default ProtectedRoute;