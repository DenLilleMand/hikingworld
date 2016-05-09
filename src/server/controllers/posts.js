var express = require('express'),
    router = express.Router(),
    db = require('../model/models/db');
const GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    postModel = db.Post;

router.get('/', () => {
    console.log('received get request:');
    postModel.getAll(db).then((posts) => {
        response.append('Content-Type', 'application/json');
        response.append('Accept', 'application/json');
        response.status(200).json({
            posts:posts
        });
    }).catch((err) => {
        console.log('Error happended in the HTTP GET post api:', err);
        response.sendStatus(404);
    });

});

router.post('/', () => {
    console.log('server post post was called');
    postModel.create(request.body.post).then((post) => {
        response.append('Content-Type', 'application/json');
        response.append('Accept', 'application/json');
        response.status(201).json({
            post:post
        });
    }).catch((err) => {
        console.log('Error happended in the HTTP POST post api:', err);
        response.sendStatus(404);
    });
});

router.delete('/', () => {
    console.log('server post delete was called.');
    postModel.delete(request.params.id).then(() => {
        response.sendStatus(200);
    }).catch((err) => {
        console.log('Error happended in the HTTP DELETE post api:', err);
        response.sendStatus(404);
    });
});

router.put('/', () => {
    console.log('server post put was called');
    postModel.update(request.body.post).then((post) => {
        response.append('Content-Type', 'application/json');
        response.append('Accept', 'application/json');
        response.status().json({
            post: post
        });
    }).catch((err) => {
        console.log('Error happended in the HTTP PUT post api:', err);
        response.sendStatus(404);
    });

});

module.exports = router;

