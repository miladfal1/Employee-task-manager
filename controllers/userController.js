const User = require("../models/user");
const Task = require("../models/tasks");

const homePage = async (req, res) => {
  res.render("home");
};

const getAllUsers = async (req, res) => {
  const list = await User.find().exec();
  res.render("userlist", {
    users: list,
  });
};

const getAddUser = (req, res) => {
  res.render("addUser");
};

const addUser = async (req, res) => {
  const data = req.body;
  const user = await User.create({
    username: data.username,
    password: data.password,
    phonenumber: data.phonenumber,
    address: data.address,
  });
  res.redirect("/alluser");
};

const getRegister = (req, res) => {
  res.render("addUser");
};

const register = async (req, res) => {
  const data = req.body;
  const user = await User.create({
    username: data.username,
    password: data.password,
    phonenumber: data.phonenumber,
    address: data.address,
  });
  res.redirect("/alluser");
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
    },
    { new: true }
  );
  if (!user) return res.status(404).send("User with the given id not found");

  res.redirect("/alluser");
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
    res.redirect("/alluser");
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
  homePage,
  getAllUsers,
  getAddUser,
  addUser,
  getUpdateUser,
  updateUser,
  getDeleteUser,
  deleteUser,
  profile,
  getRegister,
  register,
};
