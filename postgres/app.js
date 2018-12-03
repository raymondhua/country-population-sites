// Node.js app - running via NGNIX on port 8080
// NGNIX file - /etc/nginx/sites-enabled/postgres-settings

// Imports the node modules using variables
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

// Imports the routes using variables
var index = require('./routes/index');
var region = require('./routes/region');
var showAll = require('./routes/showAll');
var inspirations = require('./routes/inspirations');

// Set up the express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Imports the API link file
require('./server/routes')(app);

//Returns routes
app.use('/', index);
app.use('/region', region);
app.use('/showAll', showAll);
app.use('/inspirations', inspirations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error404');   // renders the 404 error page
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);   // renders the 500 error page
  res.render('error500');
});

module.exports = app;
