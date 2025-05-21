 App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Homepage from './Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;