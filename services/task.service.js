const Task = require("../models/tasks");

class TaskService {
  taskModel = Task;
  constructor() {}

  async getTask(id) {
    return await this.taskModel.find({ owner: id });
  }

  async createTask(title, id) {
    return await this.taskModel.create({
      title: title,
      owner: id,
    });
  }

  async deleteTask(id) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async updateTask(id, title, completed, solution) {
    return await this.taskModel.findByIdAndUpdate(
      id,
      { title: title, completed: completed, solution: solution },
      { new: true }
    );
  }
}

module.exports = TaskService;
