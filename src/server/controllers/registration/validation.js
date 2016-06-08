var exports = module.exports,
    validation = require('validator'),
    config = require('../../config/configuration/configuration.json'),
    xss = require('xss'),
    security = require('../../util/security.js'),
    fs = require('fs'),
    guid = require('guid');

exports.validateRegistration = (post) => {

    var username = post.username;
    var password = post.password;
    var password_confirm = post.password_repeat;
    var firstName = post.firstname;
    var lastName = post.lastname;

    var inputArray = [username, password, password_confirm, firstName, lastName];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    username = xss(username);
    password = xss(password);
    password_confirm = xss(password_confirm);
    firstName = xss(firstName);
    lastName = xss(lastName);

    if (username === "" || password === "" || firstName === "" || lastName === "" || password_confirm === "") {
        return {
            result: false,
            msg: "You need to enter all the details"
        };
    }

    var regexName = /[a-zA-Z ]+/;

    if (!firstName.match(regexName) || !lastName.match(regexName)) {
        return {
            result: false,
            msg: "The first and last name can only contain letters and spaces",
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

    var username = post.username;
    var password = post.password;

    var inputArray = [username, password];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    username = xss(username);
    password = xss(password);

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

    var firstName = post.firstname;
    var lastName = post.lastname;
    var email = post.email;
    var password = post.password;
    var password_new = post.password_new;

    var inputArray = [firstName, lastName, email, password, password_new];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    firstName = xss(firstName);
    lastName = xss(lastName);
    email = xss(email);
    password = xss(password);
    password_new = xss(password_new);

    if (firstName === "" || lastName === "" || email === "") {
        return {
            result: false,
            msg: "First name, last name and email is required"
        }
    }

    var regexName = /[a-zA-Z ]+/;

    if (!firstName.match(regexName) || !lastName.match(regexName)) {
        return {
            result: false,
            msg: "The first and last name can only contain letters and spaces",
        };
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
    if (!files || files.image.name === "" || files.image.mimetype !== "image/jpeg" || files.image.data.toString('hex').substring(0, 4) !== "ffd8") {
        console.log("Image not valid");
    } else {

        fileName = guid.raw();
        profilepicture = files.image;
        var filePath = './static/profilepictures/' + fileName + '.jpg';
        profilepicture.mv(filePath, function(err) {
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

    var email = post.email;

    var inputArray = [email];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    email = xss(email);

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

    var password = post.password;
    var password_confirm = post.password_repeat;

    var inputArray = [password, password_confirm];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    password = xss(password);
    password_confirm = xss(password_confirm);

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

    var veriUser = post.un;
    var checksum = post.cs;

    var inputArray = [veriUser, checksum];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    veriUser = xss(veriUser);
    checksum = xss(checksum);

    return {
        result: true,
        msg: "Success",
        veriUser,
        checksum
    };
};

exports.validateReset = (query) => {

    var email = query.un;
    var checksum = query.cs;

    var inputArray = [email, checksum];

    if (!security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    email = xss(email);
    checksum = xss(checksum);

    return {
        result: true,
        msg: "Success",
        email,
        checksum
    };
};

exports.validateMessage = (msg) => {
    var passedMsg = msg;

    var inputArray = [passedMsg];

    if (passedMsg && !security.validateType(inputArray, 'string')) {
        return {
            result: false,
            msg: "An error occured"
        };
    }

    passedMsg = xss(passedMsg);

    return {
        result: true,
        msg: "Success",
        passedMsg
    };
};
