var postApi = require('./post');
module.exports = (db) => {
    var module = {};
    const GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE';

    module.handleRequest = (request, response) => {
        switch(request.method) {
            case GET:


                break;
            case POST:
                console.log('server post post was called');
                postApi.createPost(request, response, (data) => {


                });
                break;
            case DELETE:

                break;
            case PUT:

                break;
            default:
                console.log('default case in the post api was called');
        }
    };

    return module;
};

