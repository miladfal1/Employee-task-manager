const express = require("express");
const expressLayoutes = require("express-ejs-layouts");
const cors = require("cors");
const path = require("path");
const { chatroom } = require("./controllers/chat.controller");
const bodyParser = require("body-parser");
const session = require("express-session");

const createServer = require("http").createServer;
const Server = require("socket.io").Server;
const cookieParser = require("cookie-parser");
const { userRouter, employeeRouter, taskRouter, chatRouter } = require("./routes");
const { checkEmployee, checkUser } = require("./middleware/authMiddleware");

const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
const { createClient } = redis;

const app = express();
const server = createServer(app);
const io = new Server(server);
require("./config/db")();

(async () => {
  pubClient = createClient({ url: "redis://127.0.0.1:6379" });
  await pubClient.connect();
  subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
})();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.set("views", [path.join(__dirname, "views"), path.join(__dirname, "views/admin-panel/")]);
app.set("view engine", "ejs");

app.use(checkEmployee, employeeRouter);
app.use(checkUser, userRouter);
app.use(taskRouter);
app.use(chatRouter);

chatroom(io);

server.listen(3000, () => {
  console.log("server is running");
});
