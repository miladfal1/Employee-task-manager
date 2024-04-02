const User = require("../models/user");
const Task = require("../models/tasks");
const Employee = require("../models/employee");

const getAllUsers = async (req, res) => {
  const list = await User.find().exec();
  res.render("userlist", {
    users: list,
  });
};

const getSignup = (req, res) => {
  res.render("signup");
};

const signup = async (req, res) => {
  const data = req.body;
  const user = await User.create({
    username: data.username,
    password: data.password,
    phonenumber: data.phonenumber,
    address: data.address,
  });
  res.redirect("/admin/allusers");
};

const getUpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const oneuser = await User.findById(id).exec();
    res.render("updateUser", {
      user: oneuser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let user = await User.findByIdAndUpdate(
    id,
    {
      username: data.username,
      password: data.password,
      phonenumber: data.phonenumber,
      address: data.address,
      role: data.role,
    },
    { new: true }
  );
  if (!user) return res.status(404).send("User with the given id not found");

  res.redirect("/admin/allusers");
};

const getDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const oneuser = await User.findById(id).exec();
    res.render("deleteUser", {
      user: oneuser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    if (!user) return res.status(404).send("User with the given id not found");
    res.redirect("/admin/allusers");
  } catch (error) {
    res.status(400).send(error.message);
    res.redirect("/admin/allusers");
  }
};

//employee management

const getAllEmployee = async (req, res) => {
  const list = await Employee.find().exec();
  res.render("manageEmployees", {
    Employees: list,
  });
};

const getAddEmployee = (req, res) => {
  res.render("addEmployee");
};

const addEmployee = async (req, res) => {
  const data = req.body;
  const employee = await Employee.create({
    name: data.name,
    password: data.password,
    phonenumber: data.phonenumber,
    address: data.address,
    role: data.role,
  });
  res.redirect("/admin/allemployee");
};

const getDeleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const oneEmployee = await Employee.findById(id).exec();
    res.render("deleteEmployee", {
      employee: oneEmployee,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByIdAndRemove(id);
    if (!employee) return res.status(404).send("Employee with the given id not found");
    res.redirect("/admin/allemployee");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//profile

const profile = async (req, res) => {
  const id = req.params.id;
  try {
    const findUser = await User.findById(id);
    const list = await Task.find({ owner: id });
    if (!findUser) {
      return res.status(404).send("User with the given id not found");
    }
    res.render("profile", { user: findUser, tasks: list });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
};

module.exports = {
  getAllUsers,
  getSignup,
  signup,
  getUpdateUser,
  updateUser,
  getDeleteUser,
  deleteUser,
  profile,
  getAllEmployee,
  getAddEmployee,
  addEmployee,
  getDeleteEmployee,
  deleteEmployee,
};
