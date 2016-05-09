module.exports = function (sequelize, DataTypes) {
    var Path = require('path');
    var Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(124),
            field: 'description',
            unique: false
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
            associate: function (models) {
                console.log('post model has no relationships right now');
            },
            seed: function(models) {
                return Post.bulkCreate([{
                    description:"post1"
                }, {
                    description: "post2"
                }, {
                    description: "post3"
                }, {
                    description: "post4"
                }]);
            },
            syncing: function (force) {
                Post.sync({
                    force: force
                }).catch(function (error) {
                    console.log('error creating post table:');
                    console.log(error);
                });
            },
            create: function (post, models) {
                return Post.create(post);
            },
            update: function (post, models) {
                return Post.findOne({
                    where: {
                        id: post.id
                    }
                }).then(function (persistedPost) {
                    return persistedPost.updateAttributes(post);
                }).catch(function (error) {
                    console.log("error happended while trying to find and update a post, Date: " + new Date() + " . in path:" + Path.basename(__filename) + " . error was:");
                    console.log(error);
                });
            },
            delete: function (post, models) {
                return Post.destroy({
                    where: {
                        id: post.id
                    }
                });
            },
            getAll: function (models, query) {
                return Post.findAll({});
            },
            get: function (id, models, query) {
                return Post.findOne({
                    where: {
                        id: id
                    }
                }).then(function (post) {
                    return post;
                }).catch(function (error) {
                    console.log('couldn\'t find the post');
                    console.log(error);
                });
            }
        }
    });

    return Post;
};
