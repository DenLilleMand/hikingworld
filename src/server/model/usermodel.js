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

                var emailChecksum = new Buffer(pwdHandler.generateRandomBytes(32)).toString('base64');                

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
                    var emailChecksum = new Buffer(pwdHandler.generateRandomBytes(32)).toString('base64');
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
    module.getDetails = (username, callback) => {
        console.log('get details in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT firstname, lastname, username, imagepath FROM account WHERE username = ? limit 1', [username], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if (rows.length !== 1) {
                    connection.release();
                    return callback(false, "Something went wrong");
                }

                return callback(true, {
                    firstName: rows[0].firstname,
                    lastName: rows[0].lastname,
                    email: rows[0].username,
                    profilePicture: rows[0].imagepath
                });
            });
        });
    };
    module.performUpdate = (details, callback) => {
        console.log('perform update in the userModel was called');
        pool.getConnection((err, connection) => {
            connection.query('SELECT firstname, lastname, username, password, salt FROM account WHERE username = ? limit 1', [details.email], (err, rows, fields) => {
                if (err) {
                    throw err;
                }

                if (rows.length !== 1) {
                    connection.release();
                    return callback(false, { msg: "User does not exist" });
                }

                if (details.changePassword) {
                    var pwdCheck = pwdHandler.hashValue(details.oldPassword + rows[0].salt);

                    if (pwdCheck !== rows[0].password) {
                        return callback(false, { msg: "The old password is not correct" })
                    } else {

                        var salt = pwdHandler.generateRandomBytes(32);

                        var hashedAndSaltedPassword = pwdHandler.hashValue(details.newPassword + salt);

                        connection.query('UPDATE account SET firstname = ?, lastname = ?, password = ?, salt = ?, imagepath = ?, username = ? WHERE username = ?', [details.firstName, details.lastName, hashedAndSaltedPassword, salt, details.fileName, details.email, details.email], (err, rows, fiels) => {
                            if (err) {
                                throw err;
                            }
                            return callback(true, {
                                firstName: details.firstName,
                                lastName: details.lastName,
                                email: details.email,
                                msg: "Everything went good"
                            });
                        });
                    }
                } else {
                    connection.query('UPDATE account SET firstname = ?, lastname = ?, imagepath = ?, username = ? WHERE username = ?', [details.firstName, details.lastName, details.fileName, details.email, details.email], (err, rows, fiels) => {
                        if (err) {
                            throw err;
                        }
                        if (rows.affectedRows === 1) {
                            return callback(true, {
                                firstName: details.firstName,
                                lastName: details.lastName,
                                email: details.email,
                                profilePicture: details.fileName,
                                msg: "Everything went good"
                            });
                        } else {
                            return callback(false, {
                                firstName: details.firstName,
                                lastName: details.lastName,
                                email: details.email,
                                profilePicture: details.fileName,
                                msg: "An unexpected error happened"
                            });
                        }
                    });
                }
            });
        });
    };
    return module;
};
