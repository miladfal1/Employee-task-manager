const express = require("express");
const {
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
} = require("../controllers/userController");
const { getLogin, login, Logout } = require("../controllers/authController");
const { checkUser, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("*", checkUser);

router.get("/", homePage);
router.get("/alluser", isAdmin, getAllUsers);
router.get("/updateuser/:id", getUpdateUser);
router.post("/updateuser/:id", updateUser);
router.get("/deleteuser/:id", getDeleteUser);
router.post("/deleteuser/:id", deleteUser);
router.get("/profile/:id", profile);
router.get("/adduser", isAdmin, getAddUser);
router.post("/adduser", addUser);

router.route("/register").get(getAddUser);
router.route("/login").get(getLogin).post(login);
router.route("/logout").get(Logout);

module.exports = router;
