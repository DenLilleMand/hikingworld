var exports = module.exports,
    xss = require('xss'),
    security = require('../../util/security');



exports.validateCreatePost = (post) => {
    var description = xss(post.description);
    console.log(description);
    if(!security.validateType([description], "string")) {
        return {
            isSuccess: false,
            msg: "An error occured",
            post: null
        };
    }

    return {
        isSuccess: true,
        msg: "Success",
        post: {
            description: description
        }
    }
};


exports.validateUpdatePost = (post) => {
    var description = xss(post.description);

    console.log('going to validate post:', post);
    if(!security.validateType([description], "string")) {
        return {
            isSuccess: false,
            msg: "An error occured",
            post: null
        }
    }
    console.log('reached here');

    return {
        isSuccess: true,
        msg: "Success",
        post: {
            description: description
        }
    }

};

exports.validateDeletePost = (id) => {
    if(!parseInt(id)) {
        return {
            isSuccess: false,
            msg: "An error occured",
            id: null
        }
    }

    return {
        isSuccess: true,
        msg: "Success",
        id: parseInt(id)
    }

};
