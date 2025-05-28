import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import "./homepage.css"; 

function Homepage() {
  return (
    <div className="homepage">
      <nav className="nav">
        <div className="logo">
          <h2>TaskMaster</h2>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/task-list" className="nav-link">Task List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-task" className="nav-link">Add Task</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink> {}
          </li>
          <li className="nav-item logout-item">
            <Logout />
          </li>
        </ul>
      </nav>

      <div className="landing-page">
        <header className="hero-section">
          <h1 className="hero-title">Task Master</h1>
          <p className="hero-subtitle">
            Get on top of your tasks with our simple and intuitive task list app.
          </p>
          <NavLink to="/task-list" className="hero-cta">
            Get Started
          </NavLink>
        </header>
      </div>
    </div>
  );
}

export default Homepage;