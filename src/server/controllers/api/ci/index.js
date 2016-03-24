var exports = module.exports,
    url = require('url'),
    ciApi = require('./ci');


exports.handleCIRequest = (request, response) => {
    var uri = url.parse(request.url).pathname;
    if(uri.match('build')) {
        ciApi.build(request, response, () => {
            response.end();
        });
    }
};
