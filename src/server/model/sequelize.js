module.exports = function () {
    var Sequelize = require('sequelize');
    var config = require('../config/configuration/configuration.json');
    var sequelize = new Sequelize(config.database_root.database, config.database_root.user, config.database_root.password, {
        host: config.database_root.host,
        pool: {
            max: config.database_root.connectionLimit,
            min: 0,
            idle: 1000000
        },
        logging: function() { return false; }, //console.log
        typeValidation: false
    });
    return sequelize;
};


