import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://taskmanager-q95q.onrender.com/api";
console.log("API base URL:", API_URL);  // Debug

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;