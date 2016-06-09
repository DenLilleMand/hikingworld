var exports = module.exports,
    xss = require('xss'),
    security = require('../../util/security');



exports.validateCreatePost = (post) => {
    var description = post.description;
    
    if(!security.validateType([description], "string")) {
        return {
            isSuccess: false,
            msg: "An error occured",
            post: null
        };
    }

    description = xss(description);
 
    return {
        isSuccess: true,
        msg: "Success",
        post: {
            description: description,
            markers: post.markers
        }
    }
};


exports.validateUpdatePost = (post) => {
    var description = post.description;

    if(!security.validateType([description], "string")) {
        return {
            isSuccess: false,
            msg: "An error occured",
            post: null
        }
    }
    description = xss(description);

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
