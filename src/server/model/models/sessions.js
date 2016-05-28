module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Sessions = sequelize.define('Sessions', {
        sessionId: {
            type:  DataTypes.STRING(255),
            field: 'session_id',
            primaryKey: true,
            allowNull: false
        },
        expires: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'expires',
            allowNull: false
        },
        data: {
            type: DataTypes.TEXT(),
            field:'data'
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
