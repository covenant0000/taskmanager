// // server/app.js
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const sequelize = require("./db");
// require("dotenv").config();

// const taskRoutes = require("./routes/task.routes");
// const userRoutes = require("./routes/user.routes");

// const app = express();

// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());

// // Routes
// app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);  // If you plan to add signup/login

// // DB connection
// sequelize.authenticate()
//   .then(() => console.log("Database connection has been established successfully."))
//   .catch((error) => console.error("Unable to connect to the database:", error));

// sequelize.sync()
//   .then(() => console.log("Database synced!"))
//   .catch((error) => console.error("Database sync error:", error));

// // Root route
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// module.exports = app;


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require("./db");
require("dotenv").config();

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes"); // <-- Add this line

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173" ,
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // <-- Add this line

// DB connection
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