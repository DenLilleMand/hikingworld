var exports = module.exports,
	validation = require('validator');

exports.validateRegistration = (post) => {

	if(post.username === "" || post.password === "") {
        return { result : false, msg : "You need to enter the username and password"};
    }

    if(!validation.isEmail(post.username)) {                
        return { result : false, msg : "The selected username must be an e-mail address"};
    }
            
    if (post.password !== post.password_repeat) {
        return { result : false, msg : "The passwords do not match"};
    }

    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(!post.password.match(regex)) {
        return { result : false, msg : "The password is not strong enough"};
    }

    return { result : true, msg : "Success"};
}

exports.validateLogin = (post) => {

	if(post.username == "" || post.password == "") {
       return { result : false, msg : "You need to enter the username and password"};
    }

    if(!validation.isEmail(post.username)) {                
        return { result : false, msg : "The selected username must be an e-mail address"};
    }

    return { result : true, msg : "Success"};
}


