module.exports = function () {
    var Sequelize = require('sequelize');
    var config = require('../config/configuration/configuration.json');
    var sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
        host: config.database.host,
        pool: {
            max: config.database.connectionLimit,
            min: 0,
            idle: 1000000
        },
        logging: function() { return false; }, //console.log
        typeValidation: false
    });
    return sequelize;
};


