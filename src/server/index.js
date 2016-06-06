var config = require('./config/configuration/configuration.json');
var Express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var expressSession = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSession);
var app = Express();
var ejs = require('ejs');
var helmet = require('helmet');
var cryptoHandler = require('./util/cryptohandler.js');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var fileUpload = require('express-fileupload');
security = require('./util/security.js');

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
app.use(Express.static("static"));



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
    host: config.database_root.host,
    port: config.database_root.port,
    user: config.database_root.user,
    password: config.database_root.password,
    database: config.database_root.database
};

// WE WANT TO SAVE THE SESSION INSIDE DATABASE INSTEAD OF IN MEMORY

var sessionStore = new MySQLStore(options);

app.use(cookieParser());

app.use(fileUpload());

// CONFIGURATION OF THE SESSION

var session = expressSession({
    key: config.session.key,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    secret: config.session.secret,
    store: sessionStore,
    cookie: {
        httpOnly: config.session.httpOnly,
        secure: config.session.secure
    }
});


app.use(session);
require('../chat/eventhandling')(io, session);

// CUSTOM ERROR HANDLING WHEN RECEIVING AN INVALID CSRF TOKEN


app.use(function(req, res, next) {
    req.csrfToken = function() {
        var hashedValue = "";
        if(!req.session.csrfSecret) {
            var randomBytes = cryptoHandler.generateRandomBytes(64);
            hashedValue = cryptoHandler.hashValue(randomBytes);
            req.session.csrfSecret = hashedValue;
        } else {
            hashedValue = req.session.csrfSecret;
        }
        return hashedValue;
    };
    next();
});

// SETTING UP THE ROUTES

app.use('/', require('./controllers/registration/users'));
app.use('/api', security.isAuthenticated, security.validateCSRFToken , require('./controllers/api/api'));


// 404 ERROR IF ROUTE IS NOT FOUND. THIS CODE HAS TO BE AFTER ROUTES

app.get('*', (req, res) => {
  res.status(404);
  res.render('err404.ejs');
});

// STARTING THE HTTP SERVER

server.listen(config.server.port, () => {
    console.log("Server is running! on port:", config.server.port);
});
