const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    priority: {
      type: DataTypes.ENUM('high', 'medium', 'low'),
      allowNull: false,
      defaultValue: 'medium',
    },
  }, {
    tableName: 'tasks',
    timestamps: true,
  });

  return Task;
};