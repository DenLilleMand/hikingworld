var clone = require('../../util/clone');

module.exports = (pool) => {
    var module = {};
    module.create  = (post, user , callback) => {
        console.log('post model, create');
        pool.getConnection((err, connection) => {
            connection.query('INSERT INTO post (description) VALUES (?)',[post.description], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                connection.release();
                post.id = rows.insertId;
                callback(post);
            });
        });
    };

    module.delete = (id, callback) => {
        console.log('delete in the postModel was called');
        pool.getConnection((err, connection) => {
            connection.query('DELETE FROM post WHERE id = ?',[id], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                connection.release();
                callback(true);
            });
        });
    };

    module.update = (post, callback) => {
        console.log('register in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('UPDATE post SET description=? WHERE id = ?',[post.description, post.id], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if(rows.affectedRows > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
                connection.release();
            });
        });

    };

    module.getAll = (callback) => {
        console.log('register in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM post', (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                var posts = rows.map((rowDataPacket) => {
                    return clone(rowDataPacket);
                });
                connection.release();
                callback(true, {posts} );
            });
        });
    };

    module.get = (id, callback) => {
        console.log('register in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('INSERT INTO account (username, password) VALUES(?, ?)',[username, password], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                callback(rows.insertId);
                connection.release();
            });
        });
    };

    return module;
};
