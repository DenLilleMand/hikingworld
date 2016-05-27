var express = require('express'),
	router = express.Router(),
	db = require('../model/legacydb'),
	validation = require('./validation'),
	security = require('../util/security.js');
    config = require('../config/configuration/configuration.json'),
	authentication = require('../util/authentication.js');

/*router.get('/', function(req, res) {
	res.redirect('/login');
});*/

router.get('/', function(req, res) {
	var passedMsg = req.query.msg;
	res.render('login', {
		msg: passedMsg,
		key: config.captcha.clientkey,
		csrfToken: req.csrfToken()
	});
});

router.post('/login', authentication.validateCSRFToken, function(req, res) {

	var validationResult = validation.validateLogin(req.body);

	if (validationResult.result) {
		db.userModel.login(req.body.username, req.body.password, (userSuccess, userMsg) => {
			if (userSuccess) {
				req.session.authenticated = true;
				res.redirect('/home');
			} else {
				res.redirect('/?msg=' + encodeURI(userMsg));
			}
		});
	} else {
		res.redirect('/?msg=' + encodeURI(validationResult.msg));
	}
});

router.post('/register', authentication.validateCSRFToken, function(req, res) {
	security.verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
		console.log("We are inside the validation");
		if (success) {
			var validationResult = validation.validateRegistration(req.body);
			if (validationResult.result) {
				db.userModel.register(req.body.username, req.body.password, (userSuccess, userMsg) => {
					console.log('calling callback!!!')
					if (userSuccess) {
						res.redirect('/?msg=' + encodeURI(userMsg));
					} else {
						res.redirect('/?msg=' + encodeURI(userMsg));
					}
				});
			} else {
				res.redirect('/?msg=' + encodeURI(validationResult.msg));
			}
		} else {
			res.redirect('/?msg=Incorrectcaptcha');
		}
	});
});

router.get('/verification', function(req, res) {
	var veriUser = req.query.un;
	var checksum = req.query.cs;
	if (!security.validateType(veriUser, 'string') || !security.validateType(checksum, 'string')) {
		res.send("Error!");
	} else {
		db.userModel.verification(veriUser, checksum, (userSuccess, userMsg) => {
			res.redirect('/?msg=' + encodeURI(userMsg));
		});
	}
});


router.get('/home', authentication.isAuthenticated, function(req, res) {
	res.render('home');
});

router.get('/logout', authentication.isAuthenticated, function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
});

module.exports = router;