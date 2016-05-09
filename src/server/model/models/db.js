var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var sequelize = require('../sequelize')();
var Sequelize = sequelize.Sequelize;
var inflection = sequelize.Utils.inflection;
var Promise = require('bluebird');
var db = {};
/*
 * Load in the models, and inject them into our db object
 */
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "db.js");
    }).forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[inflection.camelize(model.name)] = model;
});

Promise.map(Object.keys(db), function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
        console.log('associateing:' + modelName);
    }
}).then(function() {
    return sequelize.sync({force: true, logging: function() {return true;}});
}).then(() => {
    return Promise.each(Object.keys(db), (modelName) => {
        if("seed" in db[modelName]) {
            return db[modelName].seed(db);
        }
    });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;







