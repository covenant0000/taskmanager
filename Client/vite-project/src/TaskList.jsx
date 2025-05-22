import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './taskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dueDate');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ name: '', dueDate: '', priority: 'medium' });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('https://taskmanager-q95q.onrender.com/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://taskmanager-q95q.onrender.com/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete task');

        setTasks(tasks.filter(task => task.id !== taskId));

        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting task:', error);
        Swal.fire('Error', 'Failed to delete task', 'error');
      }
    }
  };

  const handleToggleCompleted = async (taskId) => {
    try {
      const taskToToggle = tasks.find(task => task.id === taskId);
      const response = await fetch(`https://taskmanager-q95q.onrender.com/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !taskToToggle.completed }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    // Format dueDate to YYYY-MM-DD for the date input field
    setEditedTask({
      name: task.title,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      priority: task.priority,
    });
  };

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (taskId) => {
    try {
      const response = await fetch(`https://taskmanager-q95q.onrender.com/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTask.name,
          dueDate: editedTask.dueDate,
          priority: editedTask.priority,
        }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task edits:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Make a copy before sorting to avoid mutating state directly
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sort === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="task-list">
      <h1 className="task-list-title">Task List</h1>
      <div className="task-list-filter">
        <label>
          Filter:
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
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
            onChange={e => setSort(e.target.value)}
            className="task-list-filter-select"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
      <ul className="task-list-items">
        {sortedTasks.map(task => (
          <li key={task.id} className="task-list-item">
            {editingTask === task.id ? (
              <div className="task-edit-form">
                <input
                  type="text"
                  name="name"
                  value={editedTask.name}
                  onChange={handleEditChange}
                  placeholder="Task Name"
                  className="task-edit-input"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleEditChange}
                  className="task-edit-input"
                />
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleEditChange}
                  className="task-edit-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button onClick={() => handleEditSave(task.id)} className="task-list-item-button">
                  Save
                </button>
                <button onClick={() => setEditingTask(null)} className="task-list-item-button">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task.id)}
                  className="task-list-checkbox"
                />
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  className="task-list-item-name"
                >
                  {task.title} - Due: {task.dueDate} - Priority: {task.priority}
                </span>
                <button onClick={() => handleEditClick(task)} className="task-list-item-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="task-list-item-button">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/Homepage')} className="back-to-home-button">
        Back to Home
      </button>
    </div>
  );
}

export default TaskList;