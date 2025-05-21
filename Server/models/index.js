const sequelize = require('../db'); // since db.js is in server/
const UserModel = require('./User');
const TaskModel = require('./Task');

const User = UserModel(sequelize);
const Task = TaskModel(sequelize);

// Define associations
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Task,
};