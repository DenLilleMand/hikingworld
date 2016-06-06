var config = require('../config/configuration/configuration.json');
var mysql  = require('mysql');

var pool = mysql.createPool({
    connectionLimit: config.database_appuser.connectionLimit,
    host: config.database_appuser.host,
    user: config.database_appuser.user,
    password: config.database_appuser.password,
    database: config.database_appuser.database
});

module.exports = {
    userModel: require('./usermodel')(pool)
};



