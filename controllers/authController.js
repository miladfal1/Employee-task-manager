const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bc = require("bcrypt");

const getLogin = async (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      throw new Error("username or password is incorrect");
    }
    const token = jwt.sign({ id: findUser._id }, "my secret", { expiresIn: "1d" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    console.log(`${findUser.username} is logged in`);
    res.redirect("/admin/allusers");
  } catch (err) {
    console.log(err.message);
    res.redirect("/admin");
  }
};

const Logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/admin");
};

module.exports = {
  getLogin,
  login,
  Logout,
};
