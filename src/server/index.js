var config = require('./config/configuration/configuration.json');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
var ejs = require('ejs');
var helmet = require('helmet');
var cryptoHandler = require('./util/cryptohandler.js');

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

// CONTENT-SECURITY-POLICY

app.use(helmet.csp());

// ONLY APPS WITH THE SAME ORIGIN CAN USE OUR APP INSIDE IFRAMES

app.use(helmet.xframe('sameorigin'));

// ONLY USED IN PRODUCTION, SINCE IT REQUIRES HTTPS

//app.use(helmet.hsts());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// REMOVING THE X-POWERED-BY HEADER. THIS WILL ENSURE THAT WE WON'T DISCLOSE OUR BACKEND TECHNOLOGY

app.disable('x-powered-by');

// SETTING UP THE DATABASE SPECIFICATIONS FOR THE SESSION

var options = {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
};

// WE WANT TO SAVE THE SESSION INSIDE DATABASE INSTEAD OF IN MEMORY

var sessionStore = new MySQLStore(options);

app.use(cookieParser());

// CONFIGURATION OF THE SESSION

app.use(session({
    key: config.session.key,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    secret: config.session.secret,
    store: sessionStore,
    cookie: {
        httpOnly: config.session.httpOnly,
        secure: config.session.secure
    }
}));

// CROSS-SITE REQUEST FORGERY PREVENTION MIDDLEWARE

app.use(function(req, res, next) {
    req.csrfToken = function() {
        var hash = cryptoHandler.generateSalt();
        req.session.csrfSecret = hash;
        return hash;
    }
    next();
});

// SETTING UP THE ROUTES

app.use('/', require('./controllers/users'))
app.use('/api', require('./controllers/api/post/post'))

app.get('*', function(req, res){
  res.status(404);
  res.render('err404.ejs');
});

// STARTING THE HTTP SERVER

app.listen(config.server.port, function() {
    console.log("Server is running!");
});
