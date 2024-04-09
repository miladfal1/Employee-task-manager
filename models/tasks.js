const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  solution: {
    type: String,
    default: "...",
  },
});

module.exports = mongoose.model("Task", taskSchema);
