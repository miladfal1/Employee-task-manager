// server.js یا هر نامی که برای فایل سرور خود استفاده می‌کنید
const users = [];
const moment = require("moment");
const botName = "Yoohoo";

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

const chatroom = function (io) {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      socket.join(user.room);

      // Welcome current user
      socket.emit("message", formatMessage(botName, "Welcome to Yoohoo!"));

      // Broadcast when a user connects
      socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the chat`));

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};

const getRooms = (req, res) => {
  const id = req.params.id;
  res.render("rooms");
};

const getChatroom = (req, res) => {
  res.render("chat");
};

module.exports = {
  getRooms,
  chatroom,
  getChatroom,
};
