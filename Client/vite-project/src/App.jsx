import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Homepage from './Homepage';
import SignIn from './Signin';
import SignUp from './Signup';
import Logout from './Logout';
import Footer from './footer';
import ProtectedRoute from './protectedroute';
import PublicRoute from './publicroute';
import RootRedirect from './RootRedirect'; // import it here

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {/* Root redirect based on token */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public Routes */}
          <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes */}
          <Route path="/Homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/task-list" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
          <Route path="/add-task" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;