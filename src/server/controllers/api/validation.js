var exports = module.exports,
    validation = require('validator'),
    config = require('../../config/configuration/configuration.json'),
    xss = require('xss'),
    security = require('../../util/security.js');



exports.validateCreatePost = (post) => {
    var description = xss(post.description);
    var inputArray = [description];
    if(!security.validateType(inputArray, "string")) {
        return {
            isSuccess: false,
            msg: "An error occured",
            post: null
        };
    }

    return {
        isSuccess: true,
        msg: "Success",
        post: {
            description: description
        }
    }
};


exports.validateUpdatePost = (post) => {
    var description = xss(post.description);
    var inputArray = [description];
    if(!security.validateType(inputArray, "string")) {
        return {
            isSuccess: false,
            msg: "An error occured",
            post: null
        }
    }

    return {
        isSuccess: true,
        msg: "Success",
        post: {
            description: description
        }
    }

};

exports.validateDeletePost = (id) => {
    if(!parseInt(id)) {
        return {
            isSuccess: false,
            msg: "An error occured",
            id: null
        }
    }

    return {
        isSuccess: true,
        msg: "Success",
        id: parseInt(id)
    }

};
