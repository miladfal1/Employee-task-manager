const bc = require("bcrypt");

class CheckService {
  constructor() {}

  async checkPassword(userPassword, password) {
    return await bc.compare(userPassword, password);
  }
}

module.exports = checkPassword;
