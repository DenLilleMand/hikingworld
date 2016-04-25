var postApi = require('./post')();
module.exports = (db) => {
    var module = {};
    const GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE';

    module.handleRequest = (request, response) => {
        switch(request.method) {
            case GET:
                console.log('getAll was called in post index');
                postApi.getAll(request, response, (isSuccess, data) => {
                    if(isSuccess) {
                        response.setHeader('Content-Type', 'application/json');
                        response.setHeader('Accept', 'application/json');
                        response.statusCode = 200;
                        response.write(JSON.stringify({
                            data: data.posts
                        }));
                        /*response.end(JSON.stringify({
                            status: 200,
                            body: {
                                data: data.posts
                            }
                        }));*/
                        response.end();
                    } else {
                        response.end(JSON.stringify({
                            status:404,
                            body: {
                                error: "404"
                            }
                        }));
                    }
                });
                break;
            case POST:
                console.log('server post post was called');
                postApi.create(request, response, (isSuccess, data) => {
                    if(isSuccess) {
                        response.setHeader('Content-Type', 'application/json');
                        response.setHeader('Accept', 'application/json');
                        response.statusCode = 201;
                        response.end(JSON.stringify({
                            data: {
                                post: data.post
                            }
                        }));
                    } else {
                        response.end(404);
                    }
                });
                break;
            case DELETE:
                console.log('server post delete was called');
                postApi.delete(request, response, (isSuccess) => {
                    if(isSuccess) {
                        response.end(JSON.stringify({
                            status: 200
                        }));
                    } else {
                        response.end(JSON.stringify({
                            status: 404
                        }));
                    }
                });
                break;
            case PUT:
                console.log('server post put was called');
                postApi.update(request, response, (isSuccess) => {
                    if(isSuccess) {
                        response.end(JSON.stringify({
                            status:200
                        }));
                    } else {
                        response.end(JSON.stringify({
                            status: 404
                        }));
                    }
                });
                break;
            default:
                console.log('default case in the post api was called');
        }
    };

    return module;
};

