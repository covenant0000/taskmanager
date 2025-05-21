import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // <- must match the exact file name

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);