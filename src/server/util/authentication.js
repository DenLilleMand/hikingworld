module.exports = {
    isAuthenticated: function(req, res, next) {
        if (req.session && req.session.authenticated) {
            return next();
        }
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        console.log("This user is not authenticated!");
        res.redirect('/');
    },
    validateCSRFToken: function(req, res, next) {
        if (req.session && req.session.csrfSecret) {
            if (req.session.csrfSecret === req.body.csrf) {
                console.log("Token is good!");
                return next();
            }
        }
        req.session.destroy(function(err) {
            res.status(403);
            res.send("Form tampered with");
        });
    }
}
