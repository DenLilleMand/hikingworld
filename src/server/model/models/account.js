module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING(124),
            field: 'username',
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(512),
            field: 'password',
            allowNull: false
        },
        
        salt: {
            type: DataTypes.STRING(145),
            field: 'salt'
        },
        verification: {
            type: DataTypes.BOOLEAN,
            field: 'verification'
        },
        checksum: {
            type: DataTypes.STRING(145),
            field: 'checksum'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt',
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'createdAt',
            allowNull: true
        }
    }, {
        tableName: 'account',
        classMethods: {
            associate: function (models) {
                Account.hasMany(models.Sessions, {foreignKey: 'fk_account_sessions'});
            },
            syncing: function (force) {
                Account.sync({
                    force: force
                }).catch(function (error) {
                    console.log('error creating person table:');
                    console.log(error);
                });
            },
            create: function (account) {
                return Account.create(account);
            },
            update: function (account, models) {
                return Account.findOne({
                    where: {
                        id: account.id
                    }
                }).then(function (persistedAccount) {
                    return persistedAccount.updateAttributes(account);
                }).catch(function (error) {
                    console.log("error happended while trying to find and update an account, Date: " + new Date() + " . in path:" + Path.basename(__filename) + " . error was:");
                    console.log(error);
                });
            },
            delete: function (account) {
                Account.destroy({
                    where: {
                        id: account.id
                    }
                });
            },
            getAll: function (models, query) {
                return Account.findAll({});
            },
            get: function (id) {
                return Account.findOne({
                    where: {
                        id: id
                    }
                }).then(function (account) {
                    return account;
                }).catch(function (error) {
                    console.log('couldn\'t find the account');
                    console.log(error);
                });
            }
        }
    });

    return Account;
};
