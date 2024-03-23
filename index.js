const express = require("express");
const cors = require("cors");
const path = require("path");
const expressLayoutes = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const { userRouter } = require("./routes");
const router = require("./routes/task.routes");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
require("./config/db")();

app.use(expressLayoutes);
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

app.set("view engine", "ejs");

app.use(userRouter);
app.use(router);

app.listen(3000, () => {
  console.log("server is runing");
});
