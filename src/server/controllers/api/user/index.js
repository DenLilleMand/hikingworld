var exports = module.exports,
    url = require('url'),
    userApi = require('./user'),
    qs = require('querystring');

exports.handleUserRequest = (request, response) => {
    var uri = url.parse(request.url).pathname;
    if(uri.match('login')) {
        userApi.login(request, response, (success, msg) => {
            if(success) {                            
                response.writeHead(302, {
                    Location: '/application'
                });
            }
            else {                
                response.writeHead(302, {
                    Location: '/?msg=' + msg
                });
            }           
            response.end(JSON.stringify({login:success}));
        });
    } else if(uri.match('logout')) {
        userApi.logout(request, response, (success) => {
            response.end(JSON.stringify({logout:success}));
        });
    } else if(uri.match('register')) {
        userApi.register(request, response, (success, msg) => {
            if(success) {                            
                response.writeHead(302, {
                    Location: '/'
                });
            }
            else {                
                response.writeHead(302, {
                    Location: '/register?msg=' + msg
                });
            }
            response.end(JSON.stringify({register:success}));
        });
    } else if(uri.match('unregister')) {
        userApi.unregister(request, response, (success) => {
            response.end(JSON.stringify({unregister:success}));
        });
    } else if(uri.match('verification')) {
        userApi.verification(request, response, (success) => {
            if(success) {                            
                response.writeHead(302, {
                    Location: '/?msg=verification' 
                });
            }
            response.end(JSON.stringify({verification:success}));
        });
    }
};

