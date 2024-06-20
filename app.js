const express = require("express");

const {
  NotFound,
  ErrorHandler,
} = require("./controller/errorHandler.controller");
const { default: mongoose } = require("mongoose");
const { TaskRouter } = require("./routes/index.routes");
const app = express();

mongoose.connect("mongodb://localhost:27017/taskmanager").then(() => {
  console.log("connect to mongoDB");
});
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(TaskRouter);

app.use(NotFound);
app.use(ErrorHandler);

app.listen(3000, () => {
  console.log("server run on Port 3000 => http://localhost:3000");
});
