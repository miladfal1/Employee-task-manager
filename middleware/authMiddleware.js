const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Employee = require("../models/employee");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "my secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/admin/allusers");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "my secret", async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        console.log(err.message);
        next();
      } else {
        let user = await User.findById(decoded.id);
        res.locals.user = user;
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkEmployee = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "my secret", async (err, decoded) => {
      if (err) {
        res.locals.employee = null;
        console.log(err.message);
        next();
      } else {
        let employee = await Employee.findById(decoded.id);
        res.locals.employee = employee;
        req.employee = decoded.employee;
        next();
      }
    });
  } else {
    res.locals.employee = null;
    next();
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.user);
    if (!user) {
      res.redirect("admin");
    }
    if (user.role !== "admin") {
      throw new Error("only admin have access");
    }
    next();
  } catch (err) {
    req.flash("flashMessage", err.message);
    res.redirect("/admin/allusers");
  }
};

const haveAccesss = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.user);
    if (!user) {
      throw new Error("only admins have access");
    }
    next();
  } catch (err) {
    req.flash("flashMessage", err.message);
    res.redirect("/admin/allemployee");
  }
};

module.exports = { auth, checkUser, isAdmin, checkEmployee, haveAccesss };
