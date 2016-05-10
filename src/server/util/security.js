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
                    console.log('some callback will be called');
                    callback(parsedData.success);
                } catch (e) {
                    console.log('some callback will be called');
                    callback(false);
                }
            });
        });
    },
    validateType: function(value, type) {
        return typeof value === type;
    }
};