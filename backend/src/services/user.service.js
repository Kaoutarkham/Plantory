// ❌ DELETE THIS LINE:
// const User = require("../models/user.model");

// ✅ Use getter pattern
class UserService {
  get User() {
    return require("../models/index").User;
  }

  async createUser(userData) {
    return await this.User.create(userData);
  }

  async findUserByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async findUserById(id) {
    return await this.User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async updateUser(id, updates) {
    await this.User.update(updates, { where: { id } });
    return await this.findUserById(id);
  }
}

module.exports = new UserService();
