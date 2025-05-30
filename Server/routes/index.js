const express = require("express");
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes"); // New

const router = express.Router();

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes); // /users/signup, /users/login

module.exports = router;