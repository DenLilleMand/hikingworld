const http = require('http');
const fileSystem = require('fs');
const path = require('path');
const url = require('url');
const api = require('./controllers/api');
const router = require('./controllers/router');

const mimeTypes = {
    html: "text/html",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    js: "text/javascript",
    css: "text/css"
};

//1. Do a submit form, to a api endpoint
//2. If it succeeds return another html page.
/**response.writeHead(302, {
  'Location': 'your/404/path.html'
  //add other headers here...
});
 response.end(); */

//Create an http server
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

server.listen(3000, '127.0.0.1', () => {

});