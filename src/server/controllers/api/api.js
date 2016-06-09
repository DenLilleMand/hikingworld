var express = require('express'),
    _ = require('lodash'),
    db = require('../../model/models/db'),
    router = express.Router(),
    api = {},
    camelize = db.Sequelize.Utils.inflection.camelize,
    IS_FIRST_LETTER_LOWERCASE = false,
    validation = require('./validation');

/**
 * This method takes a request and a response at the /api/ route of the application,
 * it. The specific route triggering this route is: router.get('/:model', api.getAll);
 * the dynamic value :model, is suppose to be the model that Sequelize declares, and should be present
 * in our db object. We use the camelize util to camelCase the modelname, so that /api/POST/ and
 * /api/poSt  all work the same, we check if the db has the model and if the model has the getAll method,
 * if it doesn't we return 404, otherwise we return a 200 status code and the data returned.
 * This implementation is an attempt at making a generic api entry for all of the sequelize models,
 * instead of having one api entry for every single sequelize model, which would be redundant and
 * far outreach the time schedule we have. one thing to notice is the "return db" the reason why we
 * return here is the way that the promise library "bluebird" that sequelize uses works, its a
 * way of telling bluebird that what we're doing here has to be done synchronous instead of async.
 * @param request
 * @param response
 * @returns {Promise.<T>}
 */
api.getAll = (request, response) => {
    var camelizedModel = camelize(request.params.model, IS_FIRST_LETTER_LOWERCASE);
    if(_.has(db, camelizedModel) && db[camelizedModel]["getAll"+camelizedModel+"s"]) {
        return db[camelizedModel]["getAll"+camelizedModel+"s"](db, request.query).then((data) => {
            response.append('Content-Type', 'application/json');
            response.append('Accept', 'application/json');
            response.status(200).json({
                data: data
            });
        }).catch((err) => {
            console.log('Error happended in the HTTP GET api:', err);
            response.sendStatus(404);
        });
    } else {
        console.log('Error happended in the HTTP GET(all) api, either model:' + camelizedModel +
            ' didn\'t exist, or maybe it doesn\'t have a getAll method');
        response.sendStatus(404);
    }
};

/**
 * @TODO: description
 * @param request
 * @param response
 * @returns {Promise.<T>}
 */
api.get = (request, response) => {
    var camelizedModel = camelize(request.params.model, IS_FIRST_LETTER_LOWERCASE);
    //her skal jeg bruge session

    if(_.has(db, camelizedModel) && db[camelizedModel]["get"+camelizedModel]) {
        return db[camelizedModel]["get"+camelizedModel](request.params.id, db, request.query).then((data) => {
            response.append('Content-Type', 'application/json');
            response.append('Accept', 'application/json');
            response.status(200).json({
                data: data
            });
        }).catch((err) => {
            console.log('Error happended in the HTTP GET api:', err);
            response.sendStatus(404);
        });
    } else {
        console.log('Error happended in the HTTP GET api, either model:' + camelizedModel +
            ' didn\'t exist, or maybe it doesn\'t have a getAll method');
        response.sendStatus(404);
    }

};

/**
 *
 * @TODO: description
 * @param request
 * @param response
 */
api.delete = (request, response) => {
    var id = request.params.id;
    var validationResult = validation.validateDeletePost(id);
    var camelizedModel = camelize(request.params.model, IS_FIRST_LETTER_LOWERCASE);
    if(_.has(db, camelizedModel) && db[camelizedModel]["delete"+camelizedModel] && validationResult.isSuccess) {
        return db[camelizedModel]["delete"+camelizedModel](validationResult.id, db, request.query).then(() => {
            response.sendStatus(200);
        }).catch((err) => {
            console.log('Error happended in the HTTP GET api:', err);
            response.sendStatus(404);
        });
    } else {
        console.log('Error happended in the HTTP DELETE api, either model:' + camelizedModel +
            ' didn\'t exist, or maybe it doesn\'t have a getAll method');
        response.sendStatus(404);
    }
};

/**
 *
 * @TODO: description
 * @param request
 * @param response
 */
api.create = (request, response) => {
    var post = request.body;
    var validationResult = validation.validateCreatePost(post);
    var camelizedModel = camelize(request.params.model, IS_FIRST_LETTER_LOWERCASE);
    if(_.has(db, camelizedModel) && db[camelizedModel]["create"+camelizedModel] && validationResult.isSuccess) {
        return db[camelizedModel]["create"+camelizedModel](validationResult.post, request.session.user, db).then((data) => {
            response.append('Content-Type', 'application/json');
            response.append('Accept', 'application/json');
            response.status(200).json({
                data: data
            });
        }).catch((err) => {
            console.log('Error happended in the HTTP POST create api:', err);
            response.sendStatus(404);
        });
    } else {
        console.log('Error happended in the HTTP POST api, either model:' + camelizedModel +
            ' didn\'t exist, or maybe it doesn\'t have a getAll method');
        response.sendStatus(404);
    }
};

/**
 *
 * @TODO: description
 * @param request
 * @param response
 */
api.update = (request, response) => {
    var post = request.body;

    var validationResult = validation.validateUpdatePost(post);

    var camelizedModel = camelize(request.params.model, IS_FIRST_LETTER_LOWERCASE);
    if(_.has(db, camelizedModel) && db[camelizedModel]["update"+camelizedModel] && validationResult.isSuccess){
        return db[camelizedModel]["update"+camelizedModel](validationResult.post, db).then((data) => {
            response.append('Content-Type', 'application/json');
            response.append('Accept', 'application/json');
            response.status(201).json({
                data: data
            });
        }).catch((err) => {
            console.log('Error happended in the HTTP GET api:', err);
            response.sendStatus(404);
        });
    } else {
        console.log('Error happended in the HTTP POST api, either model:' + camelizedModel +
            ' didn\'t exist, or maybe it doesn\'t have a getAll method');
        response.sendStatus(404);
    }
};

router.get('/:model', api.getAll);
router.get('/:model/:id', api.get);
router.post('/:model', api.create);
router.put('/:model/:id', api.update);
router.delete('/:model/:id', api.delete);

module.exports = router;
