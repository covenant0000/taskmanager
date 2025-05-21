import React, { useState, useEffect } from 'react';
import './taskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dueDate');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ name: '', dueDate: '', priority: '' });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleToggleCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditedTask({ name: task.name, dueDate: task.dueDate, priority: task.priority });
  };

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleEditSave = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...editedTask } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sort === 'priority') return a.priority - b.priority;
  });

  return (
    <div className="task-list">
      <h1 className="task-list-title">Task List</h1>
      <div className="task-list-filter">
        <label>
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="task-list-filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Sort:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="task-list-filter-select"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
      <ul className="task-list-items">
        {sortedTasks.map((task) => (
          <li key={task.id} className="task-list-item">
            {editingTask === task.id ? (
              <div className="task-edit-form">
                <input
                  type="text"
                  name="name"
                  value={editedTask.name}
                  onChange={handleEditChange}
                  placeholder="Task Name"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleEditChange}
                  placeholder="Priority (1-5)"
                />
                <button onClick={() => handleEditSave(task.id)} className="task-list-item-button">Save</button>
                <button onClick={() => setEditingTask(null)} className="task-list-item-button">Cancel</button>
              </div>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  className="task-list-item-name"
                >
                  {task.name} - {task.dueDate} - Priority: {task.priority}
                </span>
                <button
                  onClick={() => handleToggleCompleted(task.id)}
                  className="task-list-item-button"
                >
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button
                  onClick={() => handleEditClick(task)}
                  className="task-list-item-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="task-list-item-button"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;