const express = require("express");
const {
  getAllUsers,
  getSignup,
  signup,
  getUpdateUser,
  updateUser,
  getDeleteUser,
  deleteUser,
  profile,
  getAddEmployee,
  getAllEmployee,
  addEmployee,
  getDeleteEmployee,
  deleteEmployee,
} = require("../controllers/userController");
const { getLogin, login, Logout } = require("../controllers/authController");
const { auth, checkUser, isAdmin, checkEmployee } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/admin").get(getLogin).post(login);
router.route("/logout").get(Logout);

router.get("/admin/allusers", auth, getAllUsers);
router.route("/admin/signup").get(isAdmin, getSignup).post(signup);
router.route("/admin/updateuser/:id").get(isAdmin, getUpdateUser).post(updateUser);
router.route("/admin/deleteuser/:id").get(isAdmin, getDeleteUser).post(deleteUser);

router.route("/admin/allemployee").get(auth, getAllEmployee);
router.route("/admin/addemployee").get(auth, getAddEmployee).post(addEmployee);
router.route("/admin/deleteemployee/:id").get(auth, getDeleteEmployee).post(deleteEmployee);

module.exports = router;
