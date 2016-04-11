var db = require('../../../model/db'),
    qs = require('querystring');


module.exports = () => {
    var module = {};

    module.createPost = (request, response) => {
        var data = '';
        request.on('data', (data) => {
            body += data;
            if (body.length > 1e6) {
                request.connection.destroy;
            }
        });
        request.on('end', () => {
            var data = qs.parse(body);
            var post = data.post;
            var user = data.user;
            console.log('in post api:');
            console.log('User:', user);
            console.log('post:', post);

            //@TODO: validate post data
            //validation.sanitizeInput(post);
            if(true/* validation result*/) {
                db.postModel.create(post, user, (post) => {
                    return callback(true, encodeURI({post: post}));
                });
            } else {

            }
        });
    };


    module.deletePost = (request, response) => {

    };


    module.updatePost = (request, response) => {

    };

    module.getPosts = (request, response) => {

    };


    return module;
};