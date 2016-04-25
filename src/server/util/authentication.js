module.exports = {
	isAuthenticated: function(req, res, next) {
		if (req.session && req.session.authenticated) {
			return next();
		}
		// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
		console.log("This user is not authenticated!");
		res.redirect('/');
	}
}