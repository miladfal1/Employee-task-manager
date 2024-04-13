const UserService = require("../services/user.service");
const EmployeeService = require("../services/employee.service");
const TaskService = require("../services/task.service");

const userService = new UserService();
const employeService = new EmployeeService();
const taskService = new TaskService();

const getAllUsers = async (req, res) => {
  const list = await userService.getAllUsers();
  const error = req.flash("flashMessage");
  res.render("userlist", {
    users: list,
    error,
  });
};

const getSignup = (req, res) => {
  res.render("signup");
};

const signup = async (req, res) => {
  const data = req.body;
  const user = await userService.createUser(data.username, data.password, data.phonenumber, data.address);
  res.redirect("/admin/allusers");
};

const getUpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const oneuser = await userService.getUserById(id);
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
  let user = await userService.updateUser(id, data.username, data.password, data.phonenumber, data.address, data.role);
  if (!user) return res.status(404).send("User with the given id not found");

  res.redirect("/admin/allusers");
};

const getDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const oneuser = await userService.getUserById(id);
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
    const user = await userService.deleteUser(id);
    if (!user) return res.status(404).send("User with the given id not found");
    res.redirect("/admin/allusers");
  } catch (error) {
    res.status(400).send(error.message);
    res.redirect("/admin/allusers");
  }
};

//employee management

const getAllEmployee = async (req, res) => {
  const list = await employeService.getAllEmployees();
  const error = req.flash("flashMessage");
  res.render("manageEmployees", {
    Employees: list,
    error,
  });
};

const getAddEmployee = (req, res) => {
  const error = req.flash("flashMessage");
  res.render("addEmployee", { error });
};

const addEmployee = async (req, res) => {
  try {
    const data = req.body;
    const employee = await employeService.addEmployee(
      data.name,
      data.password,
      data.phonenumber,
      data.address,
      data.role
    );
    res.redirect("/admin/allemployee");
  } catch (err) {
    res.flash(err.message);
  }
};

const getDeleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const oneEmployee = await employeService.getEmployee(id);
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
    const employee = await employeService.deleteEmployee(id);
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
    const findUser = await employeService.getEmployee(id);
    const list = await taskService.getTask(id);
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
