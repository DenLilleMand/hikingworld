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
        },
        fk_account_post: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            field: "fk_account_post",
            allowNull: false
        }
    }, {
        tableName: 'post',
        classMethods: {
            associate: (models) => {
                //console.log('post model has no relationships right now');
                Post.belongsTo(models.Account, {foreignKey:'fk_account_post'});
            },
            seed: (models) => {
                /**return Post.bulkCreate([{
                    description:"post1",
                    //fk_account_post: "victoremil.r.andersen@gmail.com"
                }, {
                    description: "post2",
                    //fk_account_post: "victoremil.r.andersen@gmail.com"
                }, {
                    description: "post3",
                    //fk_account_post: "victoremil.r.andersen@gmail.com"
                }, {
                    description: "post4",
                    //fk_account_post: "victoremil.r.andersen@gmail.com"
                }]);*/
            },
            syncing: (force) => {
                Post.sync({
                    force: force
                }).catch((error) => {
                    console.log('error creating post table:');
                    console.log(error);
                });
            },
            createPost: (post, user, models) => {
                return models.Account.findOne({
                    where: {
                        username: user
                    }
                }).then((persistedAccount) => {
                    post.fk_account_post = persistedAccount.get('id');
                    console.log('The id:', post.fk_account_post);
                    return Post.create(post).then((persistedPost) => {
                        return Post.findOne({
                            where: {
                                id: persistedPost.get('id')
                            }, include: [{
                                model: models.Account
                            }]
                        })

                    });
                });
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
                return Post.findAll({
                    include: [{
                        model: models.Account
                    }]
                });
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
