var exports = module.exports,
    validation = require('validator'),
    config = require('../../config/configuration/configuration.json'),
    xss = require('xss'),
    security = require('../../util/security.js');



exports.validateCreatePost = (post) => {
    var description = xss(post.description);

    if(!security.validateType(description, "string")) {

    }

};

