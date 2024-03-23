const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.user);
    if (!user) {
      return res.status(404).redirect("/");
    }
    if (user.role !== "admin") {
      return res.status(403).redirect("/");
    }
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { checkUser, isAdmin };
