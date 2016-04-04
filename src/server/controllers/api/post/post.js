var db = require('../../../model/db'),
    qs = require('querystring');


module.exports = () => {
    var module = {};
    const GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE';


    module.handlePostRequest = (request, response) => {
        var body = '';
        switch(request.method) {
            case GET:


                break;
            case POST:
                request.on('data', (data) => {
                    body += data;
                    if(body.length > 1e6) {
                        request.connection.destroy;
                    }
                });
                request.on('end', () => {
                    var post = qs.parse(body);

                    //@TODO: validate post data
                    //validation.sanitizeInput(post);

                    if(true /* validation result*/) {
                        db.postModel.create(post, (id) => {
                            return callback(true, encodeURI({ id: id}));
                        });
                    } else {

                    }
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