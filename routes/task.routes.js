const express = require("express");
const router = express.Router();
const {
  createTask,
  getCreateTask,
  getUserTask,
  getDeleteTask,
  deleteTask,
  getUpdateTask,
  updateTask,
  getTaskSolution,
} = require("../controllers/taskController");

router.get("/:id/task", getUserTask);
router.post("/:id/addtask", createTask).get("/:id/addtask", getCreateTask);
router.post("/deletetask/:id", deleteTask).get("/deletetask/:id", getDeleteTask);
router.post("/updatetask/:id", updateTask).get("/updatetask/:id", getUpdateTask);
router.get("/solution/:id", getTaskSolution);

module.exports = router;
