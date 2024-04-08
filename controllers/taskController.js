const Task = require("../models/tasks");
const Employee = require("../models/employee");

const getUserTask = async (req, res) => {
  const id = req.params.id;
  const list = await Task.find({ owner: id });
  const findEmployee = await Employee.findById(id);
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
  const task = await Task.create({
    title: title,
    owner: id,
  });
  res.redirect(`/admin/allemployee`);
};

const getDeleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const oneTask = await Task.findById(id).exec();
    res.render("deleteTask", {
      task: oneTask,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndRemove(id);
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
    const oneTask = await Task.findById(id).exec();
    res.render("updateTask", {
      task: oneTask,
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
    const task = await Task.findByIdAndUpdate(
      id,
      { title: title, completed: completed, solution: solution },
      { new: true }
    );
    const findUser = task.owner;
    res.redirect(`/${findUser}/task`);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { getCreateTask, createTask, getUserTask, getDeleteTask, deleteTask, getUpdateTask, updateTask };
