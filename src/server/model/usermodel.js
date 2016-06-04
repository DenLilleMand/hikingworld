var pwdHandler = require('../util/cryptohandler'),
    moment = require('moment'),
    mailer = require('../util/mailhandler'),
    fs = require('fs');

module.exports = (pool) => {
    var module = {};
    module.login = (email, password, callback) => {
        pool.getConnection((err, connection) => {            

            connection.query('SELECT * FROM account INNER JOIN attempts on account.username = attempts.username WHERE account.username = ?', [email], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if (rows.length !== 1) {
                    connection.release();
                    return callback(false, "Bad login");
                }

                if (!rows[0].verification) {
                    return callback(false, "This user still needs e-mail verification.");
                }

                var startDate = rows[0].lastlogin;
                var endDate = moment();
                var minutesDiff = endDate.diff(startDate, 'minutes')

                if (rows[0].attempts >= 3 && minutesDiff < 10) {
                    return callback(false, "This user is currently locked out. Try again later.");
                }

                var pwdCheck = pwdHandler.hashValue(password + rows[0].salt);

                var dateNow = moment().format("YYYY-MM-DD HH:mm:ss");
                if (pwdCheck !== rows[0].password) {
                    connection.query('UPDATE attempts SET attempts = ?, lastLogin= ? WHERE username = ?', [rows[0].attempts + 1, dateNow, email], (err, rows, fields) => {
                        console.log("Attempt incremented by one!");
                    });
                    return callback(false, "Wrong password")
                } else {
                    connection.query('UPDATE attempts SET attempts = 0, lastLogin = NOW() WHERE username = ?', [email], (err, rows, fields) => {
                        console.log("Attempt reset");
                    });
                }

                connection.release();
                return callback(true, "Login succesful");
            });
        });
    };
    module.register = (parameters, callback) => {
        console.log('register in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM account WHERE username = ? limit 1', [parameters.username], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if (rows.length === 1) {
                    connection.release();
                    return callback(false, "User already exist");
                }

                var salt = pwdHandler.generateRandomBytes(32);

                var hashedAndSaltedPassword = pwdHandler.hashValue(parameters.password + salt);

                var emailChecksum = pwdHandler.generateRandomBytes(32);
                console.log("Are we here 1?");
                connection.beginTransaction(function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log("Are we here 2?");
                    connection.query('INSERT INTO account (username, password, salt, verification, checksum, firstname, lastname) VALUES (?, ?, ?, false, ?, ?, ?)', [parameters.username, hashedAndSaltedPassword, salt, emailChecksum, parameters.firstname, parameters.lastname], function(err, rows, field) {
                        if (err) {
                            connection.rollback(function() {
                                return callback(false, "An unexpected error happened");
                            });
                        }

                        var dateNow = moment().format("YYYY-MM-DD HH:mm:ss");

                        connection.query('INSERT INTO attempts (username, attempts, lastLogin) VALUES (?, 0, ?)', [parameters.username, dateNow], function(err, rows, field) {
                            if (err) {
                                connection.rollback(function() {
                                    return callback(false, "An unexpected error happened");
                                });
                            }
                            connection.commit(function(err) {
                                if (err) {
                                    connection.rollback(function() {
                                        return callback(false, "An unexpected error happened");
                                    });
                                }
                                console.log('Transaction Complete.');
                                connection.release();
                                var urlToSend = encodeURI(mailer.getAddress() + 'verification?un=' + parameters.username + '&cs=' + emailChecksum);
                                console.log(urlToSend);
                                mailer.sendMail(parameters.username, urlToSend, "E-mail verification");
                                return callback(true, "User created");
                            });
                        });
                    });
                });

            });
        });
    };
    module.verification = (username, checksum, callback) => {
        console.log('verification in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT checksum FROM account WHERE username = ? limit 1', [username], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                console.log("Kommer vi herind?");
                console.log(rows[0]);
                console.log(checksum);
                if (rows[0].checksum === checksum) {
                    console.log("Kommer vi herind? nummer 2");
                    connection.query('UPDATE account SET verification = true where username = ?', [username], (err, rows, fields) => {
                        if (err) {
                            throw err;
                        }
                        return callback(true, "Verification success");
                    });
                } else {
                    return callback(false, "cs error");
                }
            });
        });
    };
    module.resetPassword = (username, callback) => {
        console.log('reset password in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT count(*) as total FROM account WHERE username = ? limit 1', [username], (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                if (rows[0].total === 1) {
                    var resetChecksum = pwdHandler.generateRandomBytes(32);
                    var urlToSend = encodeURI(mailer.getAddress() + 'reset?un=' + username + '&cs=' + resetChecksum);
                    mailer.sendMail(username, urlToSend, "Password reset");
                    connection.query('UPDATE account SET verification = false, checksum = ? where username = ?', [resetChecksum, username], (err, rows, fields) => {
                        connection.release();
                        return callback(true, "An e-mail has been sent to your address");
                    });
                } else {
                    connection.release();
                    return callback(false, "Not a valid user");
                }
            });
        });
    };
    module.validateReset = (username, checksum, callback) => {
        console.log('validate reset in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT checksum FROM account WHERE username = ? limit 1', [username], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if (rows[0] != null && rows[0].checksum === checksum) {
                    connection.release();
                    return callback(true, "reset success");
                } else {
                    connection.release();
                    return callback(false, "reset failure");
                }
            });

        });
    };
    
    module.changePassword = (username, password, callback) => {
        console.log('validate reset in the userModel was called');
        pool.getConnection((err, connection) => {
            var salt = pwdHandler.generateRandomBytes(32);

            var hashedAndSaltedPassword = pwdHandler.hashValue(password + salt);

            connection.query('UPDATE account SET password = ?, salt = ?, verification = true where username = ?', [hashedAndSaltedPassword, salt, username], (err, rows, fields) => {
                if (err) {
                    connection.release();
                    return callback(false, "reset failure");
                }
                connection.release();
                return callback(true, "reset success");
            });
        });
    };
    return module;
};
