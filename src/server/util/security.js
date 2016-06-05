var config = require('../config/configuration/configuration.json'),
    https = require('https');
//
module.exports = {
    verifyRecaptcha: function(key, callback) {
        var SECRET = config.captcha.secretkey;
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
            var data = "";
            res.on('data', function(chunk) {
                data += chunk.toString();
            });
            res.on('end', function() {
                try {
                    var parsedData = JSON.parse(data);
                    console.log("er den god? " + parsedData.success);
                    callback(parsedData.success);
                } catch (e) {
                    callback(false);
                }
            });
        });
    },
    isAuthenticated: function(req, res, next) {
        if (req.session && req.session.authenticated) {
            return next();
        }
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM TO SIGN IN
        console.log("This user is not authenticated!");
        res.redirect('/');
    },
    validateCSRFToken: function(req, res, next) {
        if (config.csrf && config.csrf.isDisabled) {
            next();
        } else {
            if (req.session && req.session.csrfSecret) {
                var csrf = req.query.csrf;
                if (req.session.csrfSecret === req.body.csrf || req.get('X-CSRF-Token') === req.session.csrfSecret) {
                    console.log("Token is good!");
                    return next();
                }
            }            
            req.session.destroy(function(err) {
                res.status(403);
                res.render('err403.ejs');
            });
        }
    },
    validateType: function(input, type) {
        if (typeof input === 'object') {            
            console.log(input);
            var arrayLength = input.length;
            console.log(arrayLength);
            for (var i = 0; i < arrayLength; i++) {
                console.log(typeof input[i]);
                if(typeof input[i] !== type) {
                    return false;
                }                            
            }
            return true;
        } else {
            console.log("Er vi hernede");
            return typeof input === type;
        }
    }
};
