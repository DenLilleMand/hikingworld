var http = require('http'),
 httpProxy = require('http-proxy'),
    url = require('url');

var options = { };

var proxy = httpProxy.createProxyServer(options);

var server = http.createServer((req, res) => {
    console.log('hello world!');
    var urlParts = url.parse(req.url);
    if(req.headers['site'] === "hikingworld") {
        proxy.web(req,res, { target: 'http://localhost:3001'});
    } else {
        proxy.web(req, res, { target: 'http://localhost:8080'});
    }
});

console.log('Proxy server listening on port 3000');
server.listen(3000);
