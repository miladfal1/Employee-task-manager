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
const { getCreateTask, createTask, getDeleteTask, deleteTask } = require("../controllers/taskController");
const { getLogin, login, Logout } = require("../controllers/authController");
const { auth, isAdmin, haveAccesss } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/admin").get(getLogin).post(login);
router.route("/logout").get(Logout);

//manage users
router.get("/admin/allusers", auth, getAllUsers);
router.route("/admin/signup").get(isAdmin, getSignup).post(signup);
router.route("/admin/updateuser/:id").get(isAdmin, getUpdateUser).post(updateUser);
router.route("/admin/deleteuser/:id").get(isAdmin, getDeleteUser).post(deleteUser);

// manage employees
router.route("/admin/allemployee").get(auth, getAllEmployee);
router.route("/admin/addemployee").get(haveAccesss, getAddEmployee).post(addEmployee);
router.route("/admin/deleteemployee/:id").get(haveAccesss, getDeleteEmployee).post(deleteEmployee);

//manage tasks
router.route("/admin/:id/addtask").get(haveAccesss, getCreateTask).post(createTask);
router.route("/admin/deletetask/:id").get(haveAccesss, getDeleteTask).post(deleteTask);

module.exports = router;
