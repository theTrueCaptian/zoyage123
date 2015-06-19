// Databases
var db_import   =     require("./app/db")
var db          = new db_import("postgres://postgres:sesamestreet1@localhost/Zoyage");
db.connect();
var db_api      = new require("./app/db_api")(db);

// Express router init settings
var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');

//Intial router
var routes          = require('./routes/index');

//Users routing
var users_routes    = require('./routes/users');
var users           = new users_routes(db_api).router;

//Search routing
var search_routes   = require('./routes/search');
var search          = new search_routes(db_api).router;

var app = express();

// view engine setup
app.use(express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//OTher routes go here
app.use('/', routes);
app.use('/users', users);
app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
