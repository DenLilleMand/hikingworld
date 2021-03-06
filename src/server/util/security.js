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
    isAuthenticated: function(req, res, next) {
        if (req.session && req.session.authenticated) {
            return next();
        }
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM TO SIGN IN        
        res.redirect('/');
    },
    validateCSRFToken: function(req, res, next) {
        if (config.csrf && config.csrf.isDisabled) {
            next();
        } else {
            if (req.session && req.session.csrfSecret) {
                var csrf = req.query.csrf;
                if (req.session.csrfSecret === req.body.csrf || req.get('X-CSRF-Token') === req.session.csrfSecret) {                    
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
            var arrayLength = input.length;            
            for (var i = 0; i < arrayLength; i++) {                            
                if(typeof input[i] === 'object') {                    
                    return false;
                }                            
            }
            return true;
        } 
        return false;
    }
};
