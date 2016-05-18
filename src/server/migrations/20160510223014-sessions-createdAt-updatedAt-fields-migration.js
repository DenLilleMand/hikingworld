'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return queryInterface.addColumn('sessions', 'createdAt', {
            type: Sequelize.DATE,
            field: 'createdAt'
        }).then(() => {
            return queryInterface.addColumn('sessions', 'updatedAt', {
                type: Sequelize.DATE,
                field: 'updatedAt'
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
        return queryInterface.removeColumn('sessions', 'createdAt').then(() => {
            return queryInterface.removeColumn('sessions', 'updatedAt');
        });
    }
};
