var pwdHandler = require('../../controllers/api/user/passwordhandler'),
    moment = require('moment'),
    mailer = require('../../controllers/api/user/emailhandler');

module.exports = (pool) => {
    var module = {};
    module.login  = (email, password, callback) => {
        pool.getConnection((err, connection) => {

            var hashedPwd = pwdHandler.hashValue(password);

            connection.query('SELECT * FROM account INNER JOIN attempts on account.username = attempts.username WHERE account.username = ?',
                [email, hashedPwd], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                
                if (rows.length !== 1) {                                  
                    connection.release();
                    return callback(false, "Bad login");
                }           

                if(!rows[0].verification) {
                    return callback(false, "This user still needs e-mail verification.");
                }

                var startDate = rows[0].lastLogin;
                var endDate = moment();
                var minutesDiff = endDate.diff(startDate, 'minutes')                

                if(rows[0].attempts >= 3 && minutesDiff < 10) {
                    return callback(false, "This user is currently locked out. Try again later.");
                } 

                var pwdCheck = pwdHandler.hashValue(password + rows[0].salt);

                var dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
                if (pwdCheck !== rows[0].password) {                
                    connection.query('UPDATE attempts SET attempts = ?, lastLogin= ? WHERE username = ?', [rows[0].attempts + 1, dateNow, email], (err,rows, fields) => {
                        console.log("Attempt incremented by one!");
                    }); 
                    return callback(false, "Wrong password")
                } else {
                    connection.query('UPDATE attempts SET attempts = 0, lastLogin = NOW() WHERE username = ?', [email], (err,rows, fields) => {
                        console.log("Attempt reset");
                    });    
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
                    connection.release();
                    return callback(false, "User already exist");
                }    

                var salt = pwdHandler.generateSalt();  
                
                var hashedAndSaltedPassword = pwdHandler.hashValue(password + salt);
                
                var emailChecksum = pwdHandler.generateSalt();                                            

                connection.query('INSERT INTO account (username, password, salt, verification, checksum) VALUES (?, ?, ?, false, ?)', [username, hashedAndSaltedPassword, salt, emailChecksum], (err,rows, field) => {                    
                    var dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
                    connection.query('INSERT INTO attempts (username, attempts, lastLogin) VALUES (?, 0, ?)', [username, dateNow], (err, rows, field) => {
                        console.log("Attempt row has been created!");
                        mailer.sendMail(username, 'http://mattinielsen.com/?verificationlink=' + emailChecksum);
                    });
                    connection.release();
                    return callback(true, "User created");
                })         

            });            
        });
    };
    return module;
};
