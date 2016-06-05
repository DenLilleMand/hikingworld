var exports = module.exports,
    validation = require('validator'),
    config = require('../../config/configuration/configuration.json'),
    xss = require('xss'),
    security = require('../../util/security.js'),
    fs = require('fs'),
    guid = require('guid');

exports.validateRegistration = (post) => {

    post.username = xss(post.username);
    post.password = xss(post.password);
    post.password_repeat = xss(post.password_repeat);
    post.firstname = xss(post.firstname);
    post.lastname = xss(post.lastname);

    if (!security.validateType(post.username, 'string') || !security.validateType(post.password, 'string') || !security.validateType(post.password_repeat, 'string') || !security.validateType(post.firstname, 'string') || !security.validateType(post.lastname, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (post.username === "" || post.password === "" || post.firstname === "" || post.lastname === "" || post.password_repeat === "") {
        return {
            result: false,
            msg: "You need to enter all the details"
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

    if (!security.validateType(post.username, 'string') || !security.validateType(post.password, 'string')) {
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

exports.validateUpdate = (post, files) => {

    if (!security.validateType(post.firstname, 'string') || !security.validateType(post.lastname, 'string') || !security.validateType(post.email, 'string') || !security.validateType(post.password, 'string') || !security.validateType(post.password_new, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    var firstName = xss(post.firstname);
    var lastName = xss(post.lastname);
    var email = xss(post.email);
    var password = xss(post.password);
    var password_new = xss(post.password_new);

    if (firstName === "" || lastName === "" || email === "") {
        return {
            result: false,
            msg: "First name, last name and email is required"
        }
    }

    if (!validation.isEmail(email)) {
        return {
            result: false,
            msg: "The selected username must be an e-mail address"
        };
    }

    if ((password !== "" && password_new === "") || (password_new !== "" && password === "")) {
        return {
            result: false,
            msg: "If you wish to change your password, both fields have to be entered"
        };
    }

    var changePassword = false;

    if (password !== "" && password_new !== "") {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!password_new.match(regex)) {
            return {
                result: false,
                msg: "The new password is not strong enough."
            };
        }
        changePassword = true;
    }

    var profilepicture;
    var filename = "";

    if (!files) {            
    } else {        
        fileName = guid.raw();
        profilepicture = files.image;
        profilepicture.mv('./static/profilepictures/'+ fileName +'.jpg', function(err) {
            if(err) {
                console.log("Something happened!");
            }            
        });
    }

    return {
        result: true,
        msg: "Success",
        firstName,
        lastName,
        email,
        oldPassword: password,
        newPassword: password_new,
        changePassword,
        fileName
    };
};
