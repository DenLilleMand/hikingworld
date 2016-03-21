var exports = module.exports,
    url = require('url'),
    path = require('path'),
    fileSystem = require('fs');

const routes = {
    '/login': 'login',
    '/register': 'register',
    '/':'login'
};

const viewDirectory = '/src/server/view';

exports.routeExist = (uri) => {
    return routes[uri];
};

/**
 * @description Is called whenever a route exist,
 *  and basically uses the convention that all of our html files,
 *  is inside of a view directory
 * @param request
 * @param response
 */
exports.handleRouteRequest = (request, response) => {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd() + viewDirectory , routes[uri]) + '.html';
    var stat = fileSystem.statSync(filename);
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-length': stat.size
    });
    fileSystem.readFile(filename, function(error, data) {
        if(error) {
            response.writeHead(404);
            response.end(JSON.stringify(error));
        } else {
            response.writeHead(200);
            response.end(data);
        }
    });
};
