var express = require('express'),
    router = express.Router(),
    db = require('../../model/legacydb'),
    validation = require('./validation'),
    security = require('../../util/security.js'),
    config = require('../../config/configuration/configuration.json');

router.get('/', function(req, res) {
    var passedMsg = req.query.msg;
    var action = req.query.action;

    var inputArray1 = [passedMsg];
    var inputArray2 = [action];

    if ((passedMsg && !security.validateType(inputArray1, 'string')) || (action && !security.validateType(inputArray2, 'string'))) {
        res.send("Error!");
    }

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
        db.userModel.login(validationResult.username, validationResult.password, (userSuccess, userMsg) => {
            if (userSuccess) {
                req.session.authenticated = userSuccess;
                req.session.user = validationResult.username;
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
        if (success) {
            var validationResult = validation.validateRegistration(req.body);
            if (validationResult.result) {
                db.userModel.register(validationResult, (userSuccess, userMsg) => {
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

    var validationResult = validation.validateVerification(req.query);

    if (validationResult.result) {
        db.userModel.verification(validationResult.veriUser, validationResult.checksum, (userSuccess, userMsg) => {
            res.redirect('/?msg=' + encodeURI(userMsg));
        });
    } else {
        res.send('Error!');
    }
});

router.get('/passwordreset', function(req, res) {

    var passedMsg = req.query.msg;

    var validationResult = validation.validateMessage(passedMsg);

    if (validationResult.result) {
        res.render('passwordreset', {
            msg: passedMsg,
            csrfToken: req.csrfToken()
        });
    } else {
        res.send('Error!!');
    }
});

router.post('/passwordreset', security.validateCSRFToken, function(req, res) {

    var validationResult = validation.validatePasswordReset(req.body);

    if (validationResult.result) {
        db.userModel.resetPassword(validationResult.email, (userSuccess, userMsg) => {
            if (userSuccess) {
                res.redirect('/passwordreset?msg=' + encodeURI(userMsg));
            } else {
                res.redirect('/passwordreset?msg=' + encodeURI(userMsg));
            }
        });
    } else {
        res.redirect('/passwordreset?msg=' + encodeURI(validationResult.msg));
    }
});

router.get('/reset', function(req, res) {
    var email = req.query.un;
    var checksum = req.query.cs;

    var inputArray = [email, checksum];

    if (!security.validateType(inputArray, 'string')) {
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

        var validationResult = validation.validateMessage(passedMsg);

        if (validationResult.result) {
            res.render('changepassword', {
                msg: passedMsg,
                csrfToken: req.csrfToken()
            });
        } else {
            res.render('Error!!');
        }
    } else {
        res.render('err403');
    }
});

router.post('/changepassword', function(req, res) {
    if (req.session && req.session.reset && req.session.tempuser) {

        var validationResult = validation.validatePasswordChange(req.body);

        if (validationResult.result) {
            db.userModel.changePassword(req.session.tempuser, validationResult.password, (userSuccess, userMsg) => {
                if (userSuccess) {
                    req.session.reset = false;
                    res.redirect('/?msg=success');
                } else {
                    res.redirect('/changepassword?msg=' + encodeURI('error'));
                }
            });
        } else {
            res.redirect('/changepassword?msg=' + encodeURI(validationResult.msg));
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
            } else {
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
