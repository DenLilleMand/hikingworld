var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var sequelize = require('../sequelize')();
var Sequelize = sequelize.Sequelize;
var inflection = sequelize.Utils.inflection;
var Promise = require('bluebird');
var config = require('../../config/configuration/configuration.json');
var db = {};
/*
 * Load in the models, and inject them into our db object
 */
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "db.js");
    }).forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[inflection.camelize(model.name)] = model;
});

Promise.each(Object.keys(db), (modelName) => {
    if ("associate" in db[modelName]) {
        return db[modelName].associate(db);
    }
}).then(() => {
    return sequelize.sync({force: config.database.force, logging: () => {return true;}});
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







