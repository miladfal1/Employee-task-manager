const Employee = require("../models/employee");

class EmployeeService {
  employeeModel = Employee;
  constructor() {}

  async getEmployee(id) {
    return await this.employeeModel.findById(id);
  }

  async getAllEmployees() {
    return await this.employeeModel.find().exec();
  }

  async addEmployee(name, password, phonenumber, address, role) {
    await this.employeeModel.create({
      name,
      password,
      phonenumber,
      address,
      role,
    });
  }

  async deleteEmployee(id) {
    return await this.employeeModel.findByIdAndDelete(id);
  }

  async updateEmployee(id, password, phonenumber, address) {
    return await this.employeeModel.findByIdAndUpdate(
      id,
      {
        password,
        phonenumber,
        address,
      },
      { new: true }
    );
  }

  async findByName(name) {
    return await this.employeeModel.findOne({ name });
  }
}

module.exports = EmployeeService;
