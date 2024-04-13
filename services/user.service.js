const User = require("../models/user");

class UserService {
  userModel = User;
  constructor() {}

  async getUserById(id) {
    return await this.userModel.findById(id);
  }
  async getUserByUsername(username) {
    return await this.userModel.findOne({ username });
  }

  async getAllUsers() {
    return await this.userModel.find();
  }

  async createUser(username, password, phonenumber, address) {
    return this.userModel.create({
      username,
      password,
      phonenumber,
      address,
    });
  }

  async updateUser(id, username, password, phonenumber, address, role) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        username,
        password,
        phonenumber,
        address,
        role,
      },
      { new: true }
    );
  }

  async deleteUser(id) {
    return this.userModel.findByIdAndDelete(id);
  }
}

module.exports = UserService;
