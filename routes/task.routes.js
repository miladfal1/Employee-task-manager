const express = require("express");
const router = express.Router();
const { getUserTask, getUpdateTask, updateTask, getTaskSolution } = require("../controllers/taskController");

router.get("/:id/task", getUserTask);
router.get("/updatetask/:id", getUpdateTask).post("/updatetask/:id", updateTask);
router.get("/solution/:id", getTaskSolution);

module.exports = router;
