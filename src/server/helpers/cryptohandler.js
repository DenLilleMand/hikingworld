var crypto = require('crypto');

module.exports = {
	generateSalt : function () {
		var salt = crypto.randomBytes(16).toString("base64");
		return salt;
	},
	hashValue : function (value) {
		var hashedValue = crypto.createHash('sha256').update(value).digest('base64');
		return hashedValue;
	},
}
