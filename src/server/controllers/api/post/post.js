var db = require('../../../model/db'),
    qs = require('querystring'),
    url = require('url');


module.exports = () => {
    var module = {};

    module.create = (request, response, callback) => {
        var body = '';
        request.on('data', (data) => {
            body += data;
            if (body.length > 1e6) {
                request.connection.destroy;
            }
        });
        request.on('end', () => {
            var data = JSON.parse(body);
            var post = data.post;
            var user = data.user;

            //@TODO: validate post data
            //validation.sanitizeInput(post);
            if(true/* validation result*/) {
                db.postModel.create(post, user, (post) => {
                    callback(true, {
                        post
                    });
                });
            } else {

            }
        });
    };


    module.delete = (request, response, callback) => {
        var splittedUrl = request.url.split('/');
        if(splittedUrl.length > 0 && parseInt(splittedUrl[splittedUrl.length -1])) {
            var id = parseInt(splittedUrl[splittedUrl.length - 1]);
            db.postModel.delete(id, callback);
        }
    };


    module.update = (request, response, callback) => {
        var body = '';
        request.on('data', (data) => {
            body += data;
            if(body.length > 1e6 ) {
                request.connection.destroy;
            }
        });
        request.on('end', () => {
            var data = JSON.parse(body);
            //@TODO: validate the user?

            db.postModel.update(data.post, callback);
        });


    };

    module.getAll = (request, response, callback) => {
        console.log('get all was called in post ');
            if(true/* validation result*/) {
                console.log('get all model is gonna get called:');
                db.postModel.getAll((isSuccess, posts) => {
                    callback(isSuccess, {
                        posts
                    });
                });
            } else {

            }

    };


    return module;
};