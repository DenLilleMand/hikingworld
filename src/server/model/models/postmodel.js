module.exports = (pool) => {
    var module = {};
    module.create  = (post , callback) => {
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM account WHERE email = ? AND password = ?)',[email, password], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                connection.release();
                callback();
            });
        });
    };
    module.delete = (id, callback) => {
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

    module.update = (post, callback) => {
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

    module.getAll = (callback) => {
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
