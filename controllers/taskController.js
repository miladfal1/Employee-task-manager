const TaskService = require("../services/task.service");
const EmployeeService = require("../services/employee.service");
const taskService = new TaskService();
const employeeServie = new EmployeeService();

const Task = require("../models/tasks");
const Employee = require("../models/employee");

const getUserTask = async (req, res) => {
  const { title, done } = req.query;
  const id = req.params.id;
  const list = await taskService.getTask(id);
  const findEmployee = await employeeServie.getEmployee(id);
  const name = findEmployee.name;
  res.render("employeeTask", {
    tasks: list,
    name,
    id,
  });
};

const getCreateTask = async (req, res) => {
  const id = req.params.id;
  res.render("createTask", {
    id: id,
  });
};

const createTask = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const task = await taskService.createTask(title, id);
  res.redirect(`/admin/allemployee`);
};

const getDeleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const oneTask = await taskService.getTask(id);
    console.log(id);
    res.render("deleteTask", {
      task: oneTask,
      id: id,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.deleteTask(id);
    console.log(task);

    if (!task) return res.status(404).send("task with the given id not found");
    const owner = task.owner;
    res.redirect(`/admin/allemployee`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUpdateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const oneTask = await taskService.getTask(id);
    res.render("updateTask", {
      task: oneTask,
      id: id,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  let { title, completed, solution } = req.body;
  completed = completed === "on" ? true : false;
  try {
    const task = await taskService.updateTask(id, title, completed, solution);
    const findUser = task.owner;
    res.redirect(`/${findUser}/task`);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getTaskSolution = async (req, res) => {
  const id = req.params.id;
  try {
    const oneTask = await taskService.getTask(id);
    res.render("taskSolution", {
      task: oneTask,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getCreateTask,
  createTask,
  getUserTask,
  getDeleteTask,
  deleteTask,
  getUpdateTask,
  updateTask,
  getTaskSolution,
};
