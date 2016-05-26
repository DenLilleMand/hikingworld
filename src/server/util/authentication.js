var config = require('../config/configuration/configuration.json');
module.exports = {
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
