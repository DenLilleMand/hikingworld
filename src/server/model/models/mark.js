 module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Mark = sequelize.define('Mark', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        lat: {
            type:DataTypes.DOUBLE,
            field: 'latitude'
        },
        lng: {
            type: DataTypes.DOUBLE,
            field: 'longitude'
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
        tableName: 'mark',
        classMethods: {
            associate: function (models) {
                Mark.belongsTo(models.Post, { foreignKey: 'fk_mark_post'})
            },
            syncing: function (force) {
                Mark.sync({
                    force: force
                }).catch(function (error) {
                    console.log('error creating attempt table:');
                    console.log(error);
                });
            },
            createMark: function (mark) {
                return Mark.create(mark);
            }
        }
    });

    return Mark;
};
