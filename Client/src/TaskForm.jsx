import React, { useState } from 'react';
import './taskForm.css';

function TaskForm() {
  const [task, setTask] = useState({
    id: Math.floor(Math.random() * 1000),
    name: '',
    description: '',
    dueDate: '',
    priority: '',
    completed: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([task]));
    }
    setTask({
      id: Math.floor(Math.random() * 1000),
      name: '',
      description: '',
      dueDate: '',
      priority: '',
      completed: false,
    });
  };

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  return (
    <div className="task-form">
      <h1 className="task-form-title">Add Task</h1>
      <form onSubmit={handleSubmit} className="task-form-form">
        <label className="task-form-label">
          Task Name:
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="task-form-input"
          />
        </label>
        <br />
        <label className="task-form-label">
          Task Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="task-form-textarea"
          />
        </label>
        <br />
        <label className="task-form-label">
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="task-form-input"
          />
        </label>
        <br />
        <label className="task-form-label">
          Priority:
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="task-form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <button type="submit" className="task-form-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;