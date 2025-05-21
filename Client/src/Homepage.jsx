import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './hamburgermenu.css';

function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="nav">
        <div
          className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="menu-icon"></span>
        </div>
        <ul className={`nav-list ${menuOpen ? 'show' : ''}`}>
          <li className="nav-item">
            <Link to="/task-list" className="nav-link">
              Task List
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-task" className="nav-link">
              Add Task
            </Link>
          </li>
        </ul>
      </nav>
      <div className="landing-page">
        <header className="hero-section">
          <h1 className="hero-title">Task Master</h1>
          <p className="hero-subtitle">
            Get on top of your tasks with our simple and intuitive task
            list app
          </p>
          <button className="hero-cta">
            <Link to="/task-list" className="nav-link">
              Get Started
            </Link>
          </button>
          <img src="hero-image.jpg" alt="Hero Image" className="hero-image" />
        </header>
      </div>
    </div>
  );
}

export default Homepage;
