module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Sessions = sequelize.define('Sessions', {
        sessionId: {
            type:  DataTypes.STRING(255),
            field: 'session_id',
            primaryKey: true
        },
        expires: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'expires'
        },
        data: {
            type: DataTypes.TEXT('long'),
            field:'createdAt'
        }
    }, {
        tableName: 'sessions',
        classMethods: {
            associate: (models) => {
                Sessions.belongsTo(models.Account);

            },
            syncing: (force) => {
                Sessions.sync({
                    force: force
                }).catch((error) => {
                    console.log('error creating post table:');
                    console.log(error);
                });
            }
        }
    });

    return Sessions;
};
