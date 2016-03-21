var exports = module.exports,
    url = require('url'),
    userApi = require('./user');

exports.handleUserRequest = (request, response) => {
    var uri = url.parse(request.url).pathname;
    if(uri.match('login')) {
        userApi.login(request, response, (success) => {
            /**attempt at redirecting: */
            /*response.writeHead(302, {
             Location: '/'
             });*/
            response.end(JSON.stringify({login:success}));
        });
    } else if(uri.match('logout')) {
        userApi.logout(request, response, (success) => {
            response.end(JSON.stringify({logout:success}));
        });
    } else if(uri.match('register')) {
        userApi.register(request, response, (success) => {
            response.end(JSON.stringify({register:success}));
        });
    } else if(uri.match('unregister')) {
        userApi.unregister(request, response, (success) => {
            response.end(JSON.stringify({unregister:success}));
        });
    }
};

