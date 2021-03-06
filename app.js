var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// added
var aws = require('aws-sdk'),
	bodyParser = require('body-parser');

// added
aws.config.update({
	secretAccessKey: process.env.secretAccessKey,
	accessKeyId: process.env.accessKeyId,
	region: process.env.region
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ridelist = require('./routes/ridelist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// added
app.use(bodyParser.json());

// added
app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ridelist',ridelist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
