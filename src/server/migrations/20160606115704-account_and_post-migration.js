'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return queryInterface.removeColumn('post', 'fk_account_post').then(() => {
            return queryInterface.addColumn('post', 'fk_account_post', {
                type: Sequelize.INTEGER(10).UNSIGNED,
                field: 'fk_account_post',
                allowNull: false
            }).then(() => {

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
        return queryInterface.removeColumn('post', 'fk_account_post').then(() => {
            return queryInterface.addColumn('post', 'fk_account_post', {
                type: Sequelize.STRING(145),
                field: 'account',
                allowNull: false
            })
        });
    }
};
