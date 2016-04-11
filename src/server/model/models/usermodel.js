var crypto = require('crypto');

module.exports = (pool) => {
    var module = {};
    module.login  = (email, password, callback) => {
        pool.getConnection((err, connection) => {
            var hashedPwd = crypto.createHash('sha256').update(password).digest('base64');

            connection.query('SELECT * FROM account WHERE username = ? AND password = ?',[email, hashedPwd], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if (rows.length === 1) {                    
                    connection.release();
                    return callback(true, "Login success");
                } 
                connection.release();
                return callback(false, "Bad login");
            });
        });
    };
    module.register = (username, password, callback) => {
        console.log('register in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM account WHERE username = ? limit 1',[username, password], (err, rows, fields) => {
                if (err) {
                    throw err;
                }             

                if (rows.length === 1) {                    
                    connection.release();
                    return callback(false, "User already exist");
                }               

                var hashedPwd = crypto.createHash('sha256').update(password).digest('base64');
                
                connection.query('INSERT INTO account (username, password) values (?, ?)', [username, hashedPwd], (err,rows, field) => {                    
                    connection.release();
                    return callback(true, "User created");
                })                             
            });            
        });
    };
    return module;
};
