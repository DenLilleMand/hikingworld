var crypto = require('crypto');

module.exports = {
	generateRandomBytes: function(nob) {
		var randomBytes = crypto.randomBytes(nob).toString("base64");
		return randomBytes;
	},
	hashValue: function(value) {
		var hashedValue = crypto.createHash('sha256').update(value).digest('base64');
		return hashedValue;
	}
}