<<<<<<< HEAD
var config = require('./config/configuration.json');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
var ejs = require('ejs');
var helmet = require('helmet');
var csrf = require('csurf');

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
=======
const http = require('http');
const fileSystem = require('fs');
const path = require('path');
const url = require('url');
const api = require('./controllers/api');
const router = require('./controllers/router');
const serverConfig = require('./config/serverconfig.json');

const mimeTypes = {
    html: "text/html",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    js: "text/javascript",
    css: "text/css",
    woff2: "application/font-woff2"
>>>>>>> denlillemand-post-crud
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

app.use(csrf({
    cookie: true
}));

// CUSTOM ERROR HANDLING WHEN RECEIVING AN INVALID CSRF TOKEN

app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    req.session.destroy(function(err) {
        res.status(403)
        res.send('form tampered with')
    });
});

// SETTING UP THE ROUTES

app.use('/', require('./controllers/users'))
app.use('/api', require('./controllers/api/post/post'))

// STARTING THE HTTP SERVER

app.listen(config.server.port, function() {
    console.log("Server is running!");
});