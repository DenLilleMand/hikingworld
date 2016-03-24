var exports = module.exports,
    url = require('url');

const userApi = require('../controllers/api/user/index');
const ciApi = require('../controllers/api/ci/index');

exports.handleApiRequest = (request, response) => {
    var uri = url.parse(request.url).pathname, stat = null, readStream = null;
    if(uri.match('user')) {
        userApi.handleUserRequest(request, response);
    } else if(uri.match('test')) {
        console.log('test was hit!');
    } else if(uri.match('ci')) {
        ciApi.handleCIRequest(request, response);
    }
};