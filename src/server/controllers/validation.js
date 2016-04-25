var exports = module.exports,
    validation = require('validator'),
    config = require('../config/configuration.json'),
    xss = require('xss'),
    security = require('../util/security.js');

exports.validateRegistration = (post) => {

    post.username = xss(post.username);
    post.password = xss(post.password);
    post.password_repeat = xss(post.password_repeat);

    if(!security.validateType(post.username, 'string') 
        || !security.validateType(post.password, 'string') 
        || !security.validateType(post.password_repeat, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (post.username === "" || post.password === "") {
        return {
            result: false,
            msg: "You need to enter the username and password"
        };
    }

    if (!validation.isEmail(post.username)) {
        return {
            result: false,
            msg: "The selected username must be an e-mail address"
        };
    }

    if (post.password !== post.password_repeat) {
        return {
            result: false,
            msg: "The passwords do not match"
        };
    }

    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!post.password.match(regex)) {
        return {
            result: false,
            msg: "The password is not strong enough."
        };
    }

    return {
        result: true,
        msg: "Success"
    };
};

exports.validateLogin = (post) => {

    post.username = xss(post.username);
    post.password = xss(post.password);

    if(!security.validateType(post.username, 'string') || !security.validateType(post.password, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (post.username === "" || post.password === "") {
        return {
            result: false,
            msg: "You need to enter the username and password"
        };
    }

    if (!validation.isEmail(post.username)) {
        return {
            result: false,
            msg: "The selected username must be an e-mail address"
        };
    }

    return {
        result: true,
        msg: "Success"
    };
};