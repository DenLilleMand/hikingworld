var config = require('../config/configuration/configuration.json');
var mysql  = require('mysql');

var pool = mysql.createPool({
    connectionLimit: config.database.connectionLimit,
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

module.exports = {
    userModel: require('./models/usermodel')(pool),
    postModel: require('./models/postmodel')(pool)
};










