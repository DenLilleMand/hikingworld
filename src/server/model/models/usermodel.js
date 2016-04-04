module.exports = (pool) => {
    var module = {};
    module.login  = (email, password, callback) => {
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
    module.register = (username, password, callback) => {
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
