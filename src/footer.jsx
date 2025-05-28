// src/Footer.js
import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
    </footer>
  );
}

export default Footer;