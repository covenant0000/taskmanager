// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const COLORS = ['#357ac8', '#f0c419', '#2ecc71']; // Total, Pending, Completed

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchTasks() {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError("No token found. Please login.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch('https://taskmanager-q95q.onrender.com/api/tasks', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!res.ok) throw new Error(`Server returned ${res.status}`);
//         const data = await res.json();
//         if (!Array.isArray(data)) throw new Error("Unexpected response format");

//         setTasks(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTasks();
//   }, []);

//   if (loading) return <div className="dashboard-loading">Loading tasks...</div>;
//   if (error) return <div className="dashboard-error">Error: {error}</div>;

//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter(task => task.completed).length;
//   const pendingTasks = totalTasks - completedTasks;

//   const data = [
//     { name: 'Total', value: totalTasks },
//     { name: 'Pending', value: pendingTasks },
//     { name: 'Completed', value: completedTasks },
//   ];

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Dashboard Summary</h1>
//       <PieChart width={700} height={400}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           outerRadius="80%"
//           fill="#8884d8"
//           dataKey="value"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('https://taskmanager-q95q.onrender.com/api/tasks', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response format");

        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading tasks...</div>;
  if (error) return <div className="dashboard-error">Error: {error}</div>;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const data = [
    { name: 'Completed', value: completedTasks, color: '#2ecc71' }, 
    { name: 'Pending', value: pendingTasks, color: '#f0c419' },     
    { name: 'Total', value: totalTasks, color: '#357ac8' },         
  ];

  return (
    <div className="dashboard-container">
      <button onClick={() => navigate('/Homepage')} className="back-to-home-button">
  Back to Home
</button>
      <h1 className="dashboard-title">Dashboard Summary</h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;