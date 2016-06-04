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
                    callback(parsedData.success);
                } catch (e) {
                    callback(false);
                }
            });
        });
    },
    validateType: function(value, type) {
        return typeof value === type;
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
        if(config.csrf && config.csrf.isDisabled) {
            next();
        } else {
            if (req.session && req.session.csrfSecret) {
                if (req.session.csrfSecret === req.body.csrf) {
                    console.log("Token is good!");
                    return next();
                }
            }
            req.session.destroy(function(err) {
                res.status(403);
                res.render('err403.ejs');
            });            
        }
    }
};