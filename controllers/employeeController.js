const EmployeeService = require("../services/employee.service");
const TaskService = require("../services/task.service");
const jwt = require("jsonwebtoken");

const employeeService = new EmployeeService();
const taskService = new TaskService();

const homePage = async (req, res) => {
  const id = req.params.id;
  const oneEmployee = await employeeService.getEmployee(id);
  const error = req.flash("flashMessage");
  res.render("home", { error });
};

const getAllEmployee = async (req, res) => {
  const list = await employeeService.getAllEmployees();
  const error = req.flash("flashMessage");
  res.render("employeeList", {
    Employees: list,
    error,
  });
};

const getAddEmployee = (req, res) => {
  const error = req.flash("flashMessage");
  res.render("addEmployee", { error });
};

const addEmployee = async (req, res) => {
  const data = req.body;
  const employee = await employeeService.addEmployee(
    data.name,
    data.password,
    data.phonenumber,
    data.address,
    data.role
  );
  res.redirect("/employees");
};

const getUpdateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const oneEmployee = await Employee.findById(id).exec();
    console.log(id);
    console.log(oneEmployee);
    res.render("updateEmployee", {
      employee: oneEmployee,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let user = await employeeService.updateEmployee(id, data.password, data.phonenumber, data.address);
  if (!user) return res.status(404).send("Employee with the given id not found");

  res.redirect("/employees");
};

//profile

const employeeProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const findEmployee = await employeeService.getEmployee(id);
    const list = await taskService.getTask(id);

    if (!findEmployee) {
      return res.status(404).send("Employee with the given id not found");
    }
    res.render("employeeProfile", { employee: findEmployee, tasks: list });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
};

// employees auth

const getLoginEmployee = async (req, res) => {
  res.render("loginEmployee");
};

const loginEmployee = async (req, res) => {
  const { name, password } = req.body;
  try {
    const findEmployee = await employeeService.findByName(name);
    if (!findEmployee) {
      throw new Error("name or password is incorrect");
    }
    const token = jwt.sign({ id: findEmployee._id }, "my secret", { expiresIn: "1d" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    console.log(`${findEmployee.name} is logged in`);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    res.redirect("/login-employee");
  }
};

module.exports = {
  homePage,
  getAllEmployee,
  getAddEmployee,
  addEmployee,
  getUpdateEmployee,
  updateEmployee,
  employeeProfile,
  getLoginEmployee,
  loginEmployee,
};
