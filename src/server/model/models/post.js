module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(124),
            field: 'description'
        },
        createdAt: {
            type: DataTypes.DATE,
            field:'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    }, {
        tableName: 'post',
        classMethods: {
            associate: (models) => {
                //console.log('post model has no relationships right now');
            },
            seed: (models) => {
                return Post.bulkCreate([{
                    description:"post1",
                    fk_account_post: "victoremil.r.andersen@gmail.com"
                }, {
                    description: "post2",
                    fk_account_post: "victoremil.r.andersen@gmail.com"
                }, {
                    description: "post3",
                    fk_account_post: "victoremil.r.andersen@gmail.com"
                }, {
                    description: "post4",
                    fk_account_post: "victoremil.r.andersen@gmail.com"
                }]);
            },
            syncing: (force) => {
                Post.sync({
                    force: force
                }).catch((error) => {
                    console.log('error creating post table:');
                    console.log(error);
                });
            },
            createPost: (post, models) => {
                return Post.create(post);
            },
            updatePost: (post, models) => {
                return Post.findOne({
                    where: {
                        id: post.id
                    }
                }).then((persistedPost) => {
                    return persistedPost.updateAttributes(post);
                }).catch((error) => {
                    console.log("error happended while trying to find and update a post, Date: " + new Date() + " . in path:" + Path.basename(__filename) + " . error was:");
                    console.log(error);
                });
            },
            deletePost: (id, models, query) => {
                return Post.destroy({
                    where: {
                        id: id
                    }
                });
            },
            getAllPosts: (models, query) => {
                return Post.findAll({});
            },
            getPost: (id, models, query) => {
                return Post.findOne({
                    where: {
                        id: id
                    }
                }).then((post) => {
                    return post;
                }).catch((error) => {
                    console.log('couldn\'t find the post');
                    console.log(error);
                });
            }
        }
    });

    return Post;
};
