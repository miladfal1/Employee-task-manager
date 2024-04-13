const express = require("express");
const router = express.Router();
const { getRooms, getChatroom } = require("../controllers/chatController");
const { checkEmployee, auth } = require("../middleware/authMiddleware");

router.get("/chatroom", (req, res) => {
  res.render("chat");
});

router.get("/rooms", auth, checkEmployee, getRooms);
router.get("/rooms/chatroom", auth, checkEmployee, getChatroom);

module.exports = router;
