'use strict';

var bluebird = require('bluebird');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
        'post',
        'testAttributeMigrations',
        {
          type: Sequelize.STRING(145),
          allowNull: false,
          field: 'test'
        }
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      return queryInterface.removeColumn('post', 'testAttributeMigrations')
  }
};
