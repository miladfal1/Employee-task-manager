const Employee = require("../models/employee");
const Task = require("../models/tasks");
const jwt = require("jsonwebtoken");

const homePage = async (req, res) => {
  res.render("home");
};

const getAllEmployee = async (req, res) => {
  const list = await Employee.find().exec();
  res.render("employeeList", {
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
  let user = await Employee.findByIdAndUpdate(
    id,
    {
      password: data.password,
      phonenumber: data.phonenumber,
      address: data.address,
    },
    { new: true }
  );
  if (!user) return res.status(404).send("Employee with the given id not found");

  res.redirect("/employees");
};



//profile

const employeeProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const findEmployee = await Employee.findById(id);
    const list = await Task.find({ owner: id });
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
    const findEmployee = await Employee.findOne({ name });
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
