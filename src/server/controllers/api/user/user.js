var exports = module.exports,
    validation = require('./validation'),
    qs = require('querystring'),
    https = require('https');

exports.login = (request, response, callback) => {
    console.log('login endpoint was called');

    if(request.method === 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {
            var post = qs.parse(body);
            
            var result = validation.validateLogin(post);

            if(result.result) {
                return callback(true, encodeURI(result.msg));
            }
            else {
                return callback(false, encodeURI(result.msg));   
            }
        });
    }
};

exports.logoff = (request, response, callback) => {
    console.log('logoff endpoint was called');
    callback(true);
};

exports.register = (request, response, callback) => {
    if(request.method === 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {
            var post = qs.parse(body);

            verifyRecaptcha(post["g-recaptcha-response"], function(success) {
                if (success) {
                    var result = validation.validateRegistration(post);
                    if(result.result) {                        
                        return callback(true, encodeURI(result.msg));
                    }
                    else {
                        return callback(false, encodeURI(result.msg));   
                    }
                } else {
                    return callback(false, encodeURI("Invalid captcha")); 
                }
            });           
        });
    }
};

exports.unregister = (request, response, callback) => {
    console.log('unregister endpoint was called');
    callback(true);
};

// DETTE KODE SKAL RYKKES UD AF DENNE FIL. DESUDEN SKAL NØGLEN GEMMES I EN CONFIG FIL

var SECRET = "6LcUchwTAAAAAJZfxBeCgqhNeNhym8xS6N66jX_-";

function verifyRecaptcha(key, callback) {
    https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
        var data = "";
        res.on('data', function (chunk) {
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
}

