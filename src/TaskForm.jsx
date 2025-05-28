// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import './taskForm.css';

// function TaskForm() {
//   const Navigate = useNavigate();

//   const [task, setTask] = useState({
//     name: '',
//     description: '',
//     dueDateTime: '',
//     priority: 'medium',
//     completed: false,
//   });

//   // Request notification permission and log status
//   useEffect(() => {
//     if (Notification.permission !== 'granted') {
//       Notification.requestPermission().then(permission => {
//         console.log('Notification permission:', permission);
//       });
//     } else {
//       console.log('Notification permission already granted');
//     }
//   }, []);

//   // Check reminders every 10 seconds and show notification or fallback alert
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const reminders = JSON.parse(localStorage.getItem('taskReminders')) || [];
//       const now = new Date().getTime();
//       const remainingReminders = [];

//       console.log('Checking reminders:', reminders);

//       reminders.forEach(reminder => {
//         if (now >= reminder.time) {
//           console.log(`Reminder triggered for task: ${reminder.name}`);

//           if (Notification.permission === 'granted') {
//             new Notification(`Reminder: ${reminder.name}`, {
//               body: `This task is due now!`,
//               requireInteraction: true,
//             });
//           } else {
//             alert(`Reminder: ${reminder.name} is due now!`); // fallback alert popup
//           }
//         } else {
//           remainingReminders.push(reminder);
//         }
//       });

//       localStorage.setItem('taskReminders', JSON.stringify(remainingReminders));
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const getMinDateTime = () => {
//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//     return now.toISOString().slice(0, 16);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to add this task?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, add it!',
//       cancelButtonText: 'No, cancel',
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const dueDateTime = new Date(task.dueDateTime);

//       const response = await fetch('https://taskmanager-q95q.onrender.com/api/tasks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: task.name,
//           description: task.description,
//           dueDate: dueDateTime.toISOString(),
//           priority: task.priority,
//           completed: task.completed,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to create task');
//       await response.json();

//       Swal.fire('Added!', 'Your task has been added.', 'success');

//       if (Notification.permission === 'granted') {
//         const reminders = JSON.parse(localStorage.getItem('taskReminders')) || [];
//         reminders.push({
//           name: task.name,
//           time: dueDateTime.getTime(),
//         });
//         localStorage.setItem('taskReminders', JSON.stringify(reminders));

//         if (dueDateTime.getTime() - Date.now() <= 2 * 60 * 1000) {
//           console.log('Immediate notification for task due soon');
//           new Notification(`Reminder: ${task.name}`, {
//             body: `This task is due soon!`,
//             requireInteraction: true,
//           });
//         }
//       } else {
//         // Save reminder anyway, alert will be used instead of notification
//         const reminders = JSON.parse(localStorage.getItem('taskReminders')) || [];
//         reminders.push({
//           name: task.name,
//           time: dueDateTime.getTime(),
//         });
//         localStorage.setItem('taskReminders', JSON.stringify(reminders));
//       }

//       setTask({
//         name: '',
//         description: '',
//         dueDateTime: '',
//         priority: 'medium',
//         completed: false,
//       });

//       // Commented out so you can test notifications without navigating away
//       // navigate('/Homepage');
//     } catch (error) {
//       Swal.fire('Error', 'There was a problem adding your task.', 'error');
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
//           Due Date & Time:
//           <input
//             type="datetime-local"
//             name="dueDateTime"
//             value={task.dueDateTime}
//             onChange={handleChange}
//             className="task-form-input"
//             required
//             min={getMinDateTime()}
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
//         <button type="submit" className="task-form-button">
//           Add Task
//         </button>
//       </form>
//       <button
//         className="back-to-home-button"
//         // onClick={() => navigate('/Homepage')}
//       >
//         Back to Home
//       </button>
//     </div>
//   );
// }

// export default TaskForm;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './TaskForm.css';

function TaskForm() {
  const Navigate = useNavigate();

  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDateTime: '',
    priority: 'medium',
    completed: false,
  });

  const [activeReminders, setActiveReminders] = useState([]);

  // Request notification permission and log status
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    } else {
      console.log('Notification permission already granted');
    }
  }, []);

  // Check reminders every 10 seconds and show notification or fallback alert
  useEffect(() => {
    const interval = setInterval(() => {
      const reminders = JSON.parse(localStorage.getItem('taskReminders')) || [];
      const now = new Date().getTime();
      const remainingReminders = [];

      console.log('Checking reminders:', reminders);

      reminders.forEach(reminder => {
        if (now >= reminder.time) {
          console.log(`Reminder triggered for task: ${reminder.name}`);

          if (Notification.permission === 'granted') {
            try {
              new Notification(`Reminder: ${reminder.name}`, {
                body: `This task is due now!`,
                requireInteraction: true,
              });
            } catch (error) {
              console.error('Notification error:', error);
            }
          } else {
            alert(`Reminder: ${reminder.name} is due now!`); // fallback alert popup
          }

          // Add to activeReminders to show banner in UI
          setActiveReminders(prev => {
            if (!prev.some(r => r.name === reminder.name)) {
              return [...prev, reminder];
            }
            return prev;
          });
        } else {
          remainingReminders.push(reminder);
        }
      });

      localStorage.setItem('taskReminders', JSON.stringify(remainingReminders));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this task?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const dueDateTime = new Date(task.dueDateTime);

      const response = await fetch('https://taskmanager-q95q.onrender.com/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.name,
          description: task.description,
          dueDate: dueDateTime.toISOString(),
          priority: task.priority,
          completed: task.completed,
        }),
      });

      if (!response.ok) throw new Error('Failed to create task');
      await response.json();

      Swal.fire('Added!', 'Your task has been added.', 'success');

      if (Notification.permission === 'granted') {
        const reminders = JSON.parse(localStorage.getItem('taskReminders')) || [];
        reminders.push({
          name: task.name,
          time: dueDateTime.getTime(),
        });
        localStorage.setItem('taskReminders', JSON.stringify(reminders));

        if (dueDateTime.getTime() - Date.now() <= 2 * 60 * 1000) {
          console.log('Immediate notification for task due soon');
          new Notification(`Reminder: ${task.name}`, {
            body: `This task is due soon!`,
            requireInteraction: true,
          });
        }
      } else {
        // Save reminder anyway, alert will be used instead of notification
        const reminders = JSON.parse(localStorage.getItem('taskReminders')) || [];
        reminders.push({
          name: task.name,
          time: dueDateTime.getTime(),
        });
        localStorage.setItem('taskReminders', JSON.stringify(reminders));
      }

      setTask({
        name: '',
        description: '',
        dueDateTime: '',
        priority: 'medium',
        completed: false,
      });

      // Commented out so you can test notifications without navigating away
      // navigate('/Homepage');
    } catch (error) {
      Swal.fire('Error', 'There was a problem adding your task.', 'error');
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const dismissReminder = (name) => {
    setActiveReminders(prev => prev.filter(r => r.name !== name));
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
          Due Date & Time:
          <input
            type="datetime-local"
            name="dueDateTime"
            value={task.dueDateTime}
            onChange={handleChange}
            className="task-form-input"
            required
            min={getMinDateTime()}
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
         onClick={() => Navigate('/Homepage')}
      >
        Back to Home
      </button>

      {/* Render active reminders */}
      {activeReminders.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 1000,
          maxWidth: 320,
        }}>
          {activeReminders.map(reminder => (
            <div
              key={reminder.name}
              onClick={() => dismissReminder(reminder.name)}
              style={{
                backgroundColor: '#357ac8',
                padding: '12px 16px',
                marginBottom: '8px',
                borderRadius: '6px',
                boxShadow: '0 0 6px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              title="Click to dismiss"
            >
              Reminder: {reminder.name} is due now!
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskForm;