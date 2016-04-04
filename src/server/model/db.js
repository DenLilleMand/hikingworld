var dbConfig = require('../config/dbconfig.json');
var mysql      = require('mysql');

var pool = mysql.createPool({
    connectionLimit: dbConfig.connectionLimit,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});


module.exports = {
    userModel: require('./models/usermodel')(pool)
};










