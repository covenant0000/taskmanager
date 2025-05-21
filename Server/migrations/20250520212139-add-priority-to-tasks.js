'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'priority', {
      type: Sequelize.ENUM('high', 'medium', 'low'),
      allowNull: false,
      defaultValue: 'medium',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'priority');
  }
};