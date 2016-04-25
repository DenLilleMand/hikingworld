const http = require('http');
const fileSystem = require('fs');
const path = require('path');
const url = require('url');
const api = require('./controllers/api');
const router = require('./controllers/router');
const serverConfig = require('./config/serverconfig.json');

const mimeTypes = {
    html: "text/html",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    js: "text/javascript",
    css: "text/css",
    woff2: "application/font-woff2"
};

var server = http.createServer((request, response) => {
    var uri = url.parse(request.url).pathname, stat = null, readStream = null;
    if(uri.match('/api/')) {
        api.handleApiRequest(request, response);
    } else if(router.routeExist(uri)) {
        router.handleRouteRequest(request, response);
    } else {
        //serve static file
        var filename = path.join(process.cwd(), uri);
        var splittedFilename  = filename.split('.');
        if(splittedFilename && splittedFilename[splittedFilename.length -1] && mimeTypes[splittedFilename[splittedFilename.length -1]]) {
            var postFix = splittedFilename[splittedFilename.length - 1];
            var mimeType = mimeTypes[postFix];
            stat = fileSystem.statSync(filename);
            response.writeHead(200, {
                'Content-Type': mimeType,
                'Content-length': stat.size
            });
            readStream = fileSystem.createReadStream(filename);
            readStream.pipe(response);
        } else {
            //handle 404, error or whatever. . .
        }
    }
});
var port = serverConfig.port;
var host = serverConfig.host;

server.listen(port ? port : 3000, host ? host : "127.0.0.1", () => {
    console.log('Node server listening on port:');
    console.log(port);
    console.log('node server listening on host:');
    console.log(host);
});
