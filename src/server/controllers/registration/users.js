var express = require('express'),
    router = express.Router(),
    db = require('../../model/legacydb'),
    validation = require('./validation'),
    security = require('../../util/security.js'),
    config = require('../../config/configuration/configuration.json');

router.get('/', function(req, res) {
    var passedMsg = req.query.msg;
    var action = req.query.action;

    var classAct1 = action === 'register' ? '' : 'class="active"';
    var classAct2 = action === 'register' ? 'class="active"' : '';
    var displayAct1 = action === 'register' ? 'style="display: none;"' : 'style="display: block;"';
    var displayAct2 = action === 'register' ? 'style="display: block;"' : 'style="display: none;"';

    res.render('login', {
        msg: passedMsg,
        key: config.captcha.clientkey,
        csrfToken: req.csrfToken(),
        classAction1: classAct1,
        classAction2: classAct2,
        displayAction1: displayAct1,
        displayAction2: displayAct2
    });
});

router.post('/login', security.validateCSRFToken, function(req, res) {

    var validationResult = validation.validateLogin(req.body);

    if (validationResult.result) {
        db.userModel.login(req.body.username, req.body.password, (userSuccess, userMsg) => {
            if (userSuccess) {
                req.session.authenticated = userSuccess;
                req.session.user = req.body.username;
                res.redirect('/home');
            } else {
                res.redirect('/?msg=' + encodeURI(userMsg));
            }
        });
    } else {
        res.redirect('/?msg=' + encodeURI(validationResult.msg));
    }
});

router.post('/register', security.validateCSRFToken, function(req, res) {
    security.verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
        console.log("We are inside the validation");
        if (success) {
            var validationResult = validation.validateRegistration(req.body);
            if (validationResult.result) {
                db.userModel.register(req.body, (userSuccess, userMsg) => {
                    console.log('calling callback!!!')
                    if (userSuccess) {
                        res.redirect('/?msg=' + encodeURI(userMsg));
                    } else {
                        res.redirect('/?action=register&msg=' + encodeURI(userMsg));
                    }
                });
            } else {
                res.redirect('/?action=register&msg=' + encodeURI(validationResult.msg));
            }
        } else {
            res.redirect('/?action=register&msg=Incorrectcaptcha');
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

router.get('/passwordreset', function(req, res) {
    var passedMsg = req.query.msg;
    res.render('passwordreset', {
        msg: passedMsg,
        csrfToken: req.csrfToken()
    });
});

router.post('/passwordreset', security.validateCSRFToken, function(req, res) {
    var email = req.body.email;

    if (!security.validateType(email, 'string') || !validation.validateEmail(req.body.email)) {
        res.redirect('/passwordreset?msg=' + encodeURI('Invalid value. Enter a valid e-mail'));
    }

    db.userModel.resetPassword(email, (userSuccess, userMsg) => {
        if (userSuccess) {
            res.redirect('/passwordreset?msg=' + encodeURI(userMsg));
        } else {
            res.redirect('/passwordreset?msg=' + encodeURI(userMsg));
        }
    });
});

router.get('/reset', function(req, res) {
    var email = req.query.un;
    var checksum = req.query.cs;

    if (!security.validateType(email, 'string') || !security.validateType(checksum, 'string')) {
        res.send("Error!");
    }

    db.userModel.validateReset(email, checksum, (userSuccess, userMsg) => {
        if (userSuccess) {
            req.session.reset = true;
            req.session.tempuser = email;
            res.redirect('changepassword');
        } else {
            console.log("It went bad!");
            res.redirect('/?msg=' + encodeURI(userMsg));
        }
    });
});

router.get('/changepassword', function(req, res) {
    if (req.session && req.session.reset) {
        var passedMsg = req.query.msg;
        res.render('changepassword', {
            msg: passedMsg,
            csrfToken: req.csrfToken()
        });
    } else {
        res.render('err403');
    }
});

router.post('/changepassword', function(req, res) {
    if (req.session && req.session.reset && req.session.tempuser) {
        var password = req.body.password;
        var password_repeat = req.body.password_repeat;
        if (password === password_repeat) {
            db.userModel.changePassword(req.session.tempuser, password, (userSuccess, userMsg) => {
                if (userSuccess) {
                    req.session.reset = false;
                    res.redirect('/?msg=success');
                } else {
                    res.redirect('/changepassword?msg=' + encodeURI('error'));
                }
            });
        }
    }
});

router.get('/update', security.isAuthenticated, function(req, res) {

    db.userModel.getDetails(req.session.user, (userSuccess, details) => {
        if (userSuccess) {
            res.render('update', {
                csrfToken: req.csrfToken(),
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                profilePicture: "/profilepictures/" + details.profilePicture + ".jpg"
            });
        } else {
            res.redirect('/update?msg=' + details);
        }
    });
});

router.post('/update', security.isAuthenticated, security.validateCSRFToken, function(req, res) {

    var validationResult = validation.validateUpdate(req.body, req.files);

    if (validationResult.result) {
        db.userModel.performUpdate(validationResult, (userSuccess, details) => {
            if (userSuccess) {
                res.render('update', {
                    csrfToken: req.csrfToken(),
                    firstName: details.firstName,
                    lastName: details.lastName,
                    email: details.email,
                    profilePicture: "/profilepictures/" + details.profilePicture + ".jpg"
                });
            }
            else {
                console.log("Vi er her!");
                res.redirect('/update?msg=' + details.msg);
            }
        });
    } else {
        res.redirect('/update?msg=' + validationResult.msg);
    }
});

router.get('/home', security.isAuthenticated, function(req, res) {
    res.render('home', {
        csrfToken: req.csrfToken()
    });
});

router.post('/logout', security.isAuthenticated, security.validateCSRFToken, function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

module.exports = router;
