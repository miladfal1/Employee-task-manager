const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
const formatMessage = require("./utils/messages");
const botName = "Yoohoo";

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });

    socket.on("chat message", (data) => {
      console.log("message: ", data);
      io.emit("message to others", data);
    });
  });
};
