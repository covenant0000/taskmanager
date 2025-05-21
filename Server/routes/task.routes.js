const express = require("express");
const taskController = require("../controllers/task.controller");
const validate = require("../middleware/validate");
const {
  createTaskSchema,
  updateTaskSchema
} = require("../validation/taskValidation");

const router = express.Router();

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById); // Optional: can add param validation
router.post("/", validate(createTaskSchema), taskController.createTask);
router.put("/:id", validate(updateTaskSchema), taskController.updateTask);
router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;