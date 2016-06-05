var exports = module.exports,
    validation = require('validator'),
    config = require('../../config/configuration/configuration.json'),
    xss = require('xss'),
    security = require('../../util/security.js'),
    fs = require('fs'),
    guid = require('guid');

exports.validateRegistration = (post) => {

    var username = xss(post.username);
    var password = xss(post.password);
    var password_confirm = xss(post.password_repeat);
    var firstName = xss(post.firstname);
    var lastName = xss(post.lastname);

    var inputArray = [username, password, password_confirm, firstName, lastName]

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (username === "" || password === "" || firstName === "" || lastName === "" || password_confirm === "") {
        return {
            result: false,
            msg: "You need to enter all the details"
        };
    }

    if (!validation.isEmail(username)) {
        return {
            result: false,
            msg: "The selected username must be an e-mail address"
        };
    }

    if (password !== password_confirm) {
        return {
            result: false,
            msg: "The passwords do not match"
        };
    }

    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password.match(regex)) {
        return {
            result: false,
            msg: "The password is not strong enough.",
        };
    }

    return {
        result: true,
        msg: "Success",
        username,
        password,
        firstName,
        lastName
    };
};

exports.validateLogin = (post) => {

    var username = xss(post.username);
    var password = xss(post.password);

    var inputArray = [username, password];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (username === "" || password === "") {
        return {
            result: false,
            msg: "You need to enter the username and password"
        };
    }

    if (!validation.isEmail(username)) {
        return {
            result: false,
            msg: "The selected username must be an e-mail address"
        };
    }

    return {
        result: true,
        msg: "Success",
        username,
        password
    };
};

exports.validateUpdate = (post, files) => {

    var firstName = xss(post.firstname);
    var lastName = xss(post.lastname);
    var email = xss(post.email);
    var password = xss(post.password);
    var password_new = xss(post.password_new);

    var inputArray = [firstName, lastName, email, password, password_new];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

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
    var fileName = "";

    if (!files || files.image.name === "" || files.image.mimetype !== "image/jpeg") {} else {
        fileName = guid.raw();
        profilepicture = files.image;
        profilepicture.mv('./static/profilepictures/' + fileName + '.jpg', function(err) {
            if (err) {
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

exports.validatePasswordReset = (post) => {

    var email = xss(post.email);

    var inputArray = [email];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (!validation.isEmail(email)) {
        return {
            result: false,
            msg: "The entered value must be an e-mail"
        };
    }

    return {
        result: true,
        msg: "Success",
        email
    };
};

exports.validatePasswordChange = (post) => {

    var password = xss(post.password);
    var password_confirm = xss(post.password_repeat);

    var inputArray = [password, password_confirm];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    if (password !== password_confirm) {
        return {
            result: false,
            msg: "The passwords do not match"
        };
    }

    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password.match(regex)) {
        return {
            result: false,
            msg: "The new password is not strong enough."
        };
    }

    return {
        result: true,
        msg: "Success",
        password,
        password_confirm
    };
};

exports.validateVerification = (post) => {

    var veriUser = xss(post.un);
    var checksum = xss(post.cs);

    var inputArray = [veriUser, checksum];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    return {
        result: true,
        msg: "Success",
        veriUser,
        checksum
    };
};

exports.validateMessage = (msg) => {

    var passedMsg = xss(msg);

    var inputArray = [passedMsg];

    if (passedMsg && !security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    return {
        result: true,
        msg: "Success",
        passedMsg
    };
};
