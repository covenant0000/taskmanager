import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

function RootRedirect() {
  const [validToken, setValidToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setValidToken(false);
      return;
    }

    try {
      const decoded = jwtDecode.default(token);
      const now = Date.now() / 1000;
      if (decoded.exp > now) {
        setValidToken(true);
      } else {
        localStorage.removeItem('token');
        setValidToken(false);
      }
    } catch {
      localStorage.removeItem('token');
      setValidToken(false);
    }
  }, []);

  if (validToken === null) return null;

  // Redirect authenticated users to homepage, others to landing page
  return <Navigate to={validToken ? '/Homepage' : '/landing'} replace />;
}

export default RootRedirect;