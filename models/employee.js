const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["frontend", "backend", "marketing"],
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
