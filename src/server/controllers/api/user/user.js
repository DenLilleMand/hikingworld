var exports = module.exports;

exports.login = (request, response, callback) => {
    console.log('login endpoint was called');
    if(request.method === 'POST') {
        var body = '';
        request.on('data', function(data) {
            body += data;
            if(body.length > 10000000000) {
                request.connection.destroy();
            }
        });
    }
    callback(true);
};

exports.logoff = (request, response, callback) => {
    console.log('logoff endpoint was called');
    callback(true);
};

exports.register = (request, response, callback) => {
    console.log('register endpoint was called');
    callback(true);
};

exports.unregister = (request, response, callback) => {
    console.log('unregister endpoint was called');
    callback(true);
};