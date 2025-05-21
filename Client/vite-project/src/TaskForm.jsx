// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './taskForm.css';

// function TaskForm() {
//   const navigate = useNavigate();

//   const [task, setTask] = useState({ 
//     id: Math.floor(Math.random() * 1000), 
//     name: '', 
//     description: '', 
//     dueDate: '', 
//     priority: '', 
//     completed: false, 
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const storedTasks = localStorage.getItem('tasks');
//     if (storedTasks) {
//       const tasks = JSON.parse(storedTasks);
//       tasks.push(task);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     } else {
//       localStorage.setItem('tasks', JSON.stringify([task]));
//     }
//     setTask({ 
//       id: Math.floor(Math.random() * 1000), 
//       name: '', 
//       description: '', 
//       dueDate: '', 
//       priority: '', 
//       completed: false, 
//     });
//   };

//   const handleChange = (event) => {
//     setTask({ ...task, [event.target.name]: event.target.value });
//   };

//   return (
//     <div className="task-form">
//       <h1 className="task-form-title">Add Task</h1>
//       <form onSubmit={handleSubmit} className="task-form-form">
//         <label className="task-form-label"> 
//           Task Name: 
//           <input type="text" name="name" value={task.name} onChange={handleChange} className="task-form-input" /> 
//         </label> 
//         <br />
//         <label className="task-form-label"> 
//           Task Description: 
//           <textarea name="description" value={task.description} onChange={handleChange} className="task-form-textarea" /> 
//         </label> 
//         <br />
//         <label className="task-form-label"> 
//           Due Date: 
//           <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="task-form-input" /> 
//         </label> 
//         <br />
//         <label className="task-form-label"> 
//           Priority: 
//           <select name="priority" value={task.priority} onChange={handleChange} className="task-form-select" > 
//             <option value="low">Low</option> 
//             <option value="medium">Medium</option> 
//             <option value="high">High</option> 
//           </select> 
//         </label> 
//         <br />
//         <button type="submit" className="task-form-button"> 
//           Add Task 
//         </button> 
//       </form> 
//       {/* Back to Home Button */} 
//       <button className="back-to-home-button" onClick={() => navigate('/Homepage')}> 
//         Back to Home 
//       </button> 
//     </div> 
//   );
// }

// export default TaskForm;


//         import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './taskForm.css';

// function TaskForm() {
//   const navigate = useNavigate();

//   const [task, setTask] = useState({
//     name: '',
//     description: '',
//     dueDate: '',
//     priority: 'medium',
//     completed: false,
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/api/tasks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: task.name,
//           description: task.description,
//           dueDate: task.dueDate,
//           priority: task.priority,
//           completed: task.completed,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to create task');

//       await response.json();

//       // Reset form after successful post
//       setTask({
//         name: '',
//         description: '',
//         dueDate: '',
//         priority: 'medium',
//         completed: false,
//       });

//       navigate('/Homepage');
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   const handleChange = (event) => {
//     setTask({ ...task, [event.target.name]: event.target.value });
//   };

//   return (
//     <div className="task-form">
//       <h1 className="task-form-title">Add Task</h1>
//       <form onSubmit={handleSubmit} className="task-form-form">
//         <label className="task-form-label">
//           Task Name:
//           <input
//             type="text"
//             name="name"
//             value={task.name}
//             onChange={handleChange}
//             className="task-form-input"
//             required
//           />
//         </label>
//         <br />
//         <label className="task-form-label">
//           Description:
//           <textarea
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//             className="task-form-textarea"
//           />
//         </label>
//         <br />
//         <label className="task-form-label">
//           Due Date:
//           <input
//             type="date"
//             name="dueDate"
//             value={task.dueDate}
//             onChange={handleChange}
//             className="task-form-input"
//             required
//           />
//         </label>
//         <br />
//         <label className="task-form-label">
//           Priority:
//           <select
//             name="priority"
//             value={task.priority}
//             onChange={handleChange}
//             className="task-form-select"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </label>
//         <br />
//         <button type="submit" className="task-form-button">Add Task</button>
//       </form>
//       <button
//         className="back-to-home-button"
//         onClick={() => navigate('/Homepage')}
//       >
//         Back to Home
//       </button>
//     </div>
//   );
// }

// export default TaskForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // import SweetAlert2
import './taskForm.css';

function TaskForm() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    completed: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show confirmation popup before submitting
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add this task?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: task.name,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            completed: task.completed,
          }),
        });

        if (!response.ok) throw new Error('Failed to create task');

        await response.json();

        Swal.fire('Added!', 'Your task has been added.', 'success');

        setTask({
          name: '',
          description: '',
          dueDate: '',
          priority: 'medium',
          completed: false,
        });

        navigate('/Homepage');
      } catch (error) {
        Swal.fire('Error', 'There was a problem adding your task.', 'error');
        console.error('Error creating task:', error);
      }
    }
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
            required
          />
        </label>
        <br />
        <label className="task-form-label">
          Description:
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
            required
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
      <button
        className="back-to-home-button"
        onClick={() => navigate('/Homepage')}
      >
        Back to Home
      </button>
    </div>
  );
}

export default TaskForm;