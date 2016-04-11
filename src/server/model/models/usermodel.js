var pwdHandler = require('../../controllers/api/user/passwordhandler'),
    moment = require('moment')

module.exports = (pool) => {
    var module = {};
    module.login  = (email, password, callback) => {
        pool.getConnection((err, connection) => {

            var hashedPwd = pwdHandler.hashValue(password);

            connection.query('SELECT * FROM account inner join attempts on account.username = attempts.username WHERE account.username = ?',
                [email, hashedPwd], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                console.log(rows);
                if (rows.length !== 1) {                                  
                    connection.release();
                    return callback(false, "Bad login");
                }           

                var startDate = rows[0].lastLogin;
                var endDate = moment();
                var minutesDiff = endDate.diff(startDate, 'minutes')                

                if(rows[0].attempts >= 3 && minutesDiff < 10) {
                    return callback(false, "This user is currently locked out. Try again later.");
                } else if (rows[0].attempts >= 3 && minutesDiff > 10) {
                    connection.query('UPDATE attempts SET attempts = 0 WHERE username = ?', [email], (err,rows, fields) => {
                        console.log("30 minutes passed! Attempts reset.");
                    }); 
                } 

                var pwdCheck = pwdHandler.hashValue(password + rows[0].salt);

                if (pwdCheck !== rows[0].password) {
                    var dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
                    connection.query('UPDATE attempts SET attempts = ?, lastLogin= ? WHERE username = ?', [rows[0].attempts + 1, dateNow, email], (err,rows, fields) => {
                        console.log("Attempt incremented by one!");
                    }); 
                    return callback(false, "Wrong password")
                }

                connection.release();
                return callback(true, "Login succesful");
            });
        });
    };
    module.register = (username, password, callback) => {
        console.log('register in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM account WHERE username = ? limit 1',[username], (err, rows, fields) => {
                if (err) {
                    throw err;
                }             

                if (rows.length === 1) {                    
                    return callback(false, "User already exist");
                }    

                var salt = pwdHandler.generateSalt();  
                
                var hashedAndSaltedPassword = pwdHandler.hashValue(password + salt);
                
                connection.query('INSERT INTO account (username, password, salt) VALUEs (?, ?, ?)', [username, hashedAndSaltedPassword, salt], (err,rows, field) => {                    
                    var dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
                    connection.query('INSERT INTO attempts (username, attempts, lastLogin) VALUES (?, 0, ?)', [username, dateNow], (err, rows, field) => {
                        console.log("Attempt row has been created!");
                    });
                    connection.release();
                    return callback(true, "User created");
                })                             
            });            
        });
    };
    return module;
};
