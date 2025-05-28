// server/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./db");
require("dotenv").config();

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Define allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://taskmanager-orpin-nine.vercel.app", // Your deployed frontend
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());

// API routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Database connection
sequelize.authenticate()
  .then(() => console.log("Database connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

sequelize.sync()
  .then(() => console.log("Database synced!"))
  .catch((error) => console.error("Database sync error:", error));

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = app;