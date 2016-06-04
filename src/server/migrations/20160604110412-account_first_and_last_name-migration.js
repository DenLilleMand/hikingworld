'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('account', 'firstname', {
      type: Sequelize.STRING(145),
      field: 'firstname',
      allowNull: false
    }).then(() => {
      return queryInterface.addColumn('account', 'lastname', {
        type: Sequelize.STRING(145),
        field: 'lastname',
        allowNull: false
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('account', 'firstname').then(() => {
      return queryInterface.removeColumn('account', 'lastname');
    })
  }
};
