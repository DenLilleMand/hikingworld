module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Attempt = sequelize.define('Attempt', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(145),
            field: 'username',
            unique: true,
            allowNull: false
        },
        attempts: {
            type:  DataTypes.INTEGER(11),
            field: 'attempts'
        },
        lastLogin: {
            type: DataTypes.DATE,
            field: 'lastlogin'
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
        tableName: 'attempts',
        classMethods: {
            associate: function (models) {
                //console.log('attempts model has no relationships right now');
            },
            syncing: function (force) {
                Attempt.sync({
                    force: force
                }).catch(function (error) {
                    console.log('error creating attempt table:');
                    console.log(error);
                });
            },
            create: function (attempt) {
                return Attempt.create(attempt);
            },
            update: function (attempt, models) {
                return Attempt.findOne({
                    where: {
                        id: attempt.id
                    }
                }).then(function (persistedAttempt) {
                    return persistedAttempt.updateAttributes(attempt);
                }).catch(function (error) {
                    console.log("error happended while trying to find and update an attempt, Date: " + new Date() + " . in path:" + Path.basename(__filename) + " . error was:");
                    console.log(error);
                });
            },
            delete: function (attempt) {
                Attempt.destroy({
                    where: {
                        id: attempt.id
                    }
                });
            },
            getAll: function (models, query) {
                return Attempt.findAll({});
            },
            get: function (id) {
                return Attempt.findOne({
                    where: {
                        id: id
                    }
                }).then(function (attempt) {
                    return attempt;
                }).catch(function (error) {
                    console.log('couldn\'t find the attempt');
                    console.log(error);
                });
            }
        }
    });

    return Attempt;
};
