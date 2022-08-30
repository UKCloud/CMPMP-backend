var createError = require('http-errors');
var express = require('express');
var session = require('express-session'); 
var MySQLStore = require('express-mysql-session')(session);   // import and add mysql session by creating a new
var app = module.exports = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var session_options = {
  host: '${process.env.SESSION_HOST}',
  port: '${process.env.SESSION_PORT}',
  user: '${process.env.SESSION_USER}',
  password: '${process.env.SESSION_PASSWORD}',
  database: '${process.env.SESSION_DATABASE}'
};

var sessionStore = new MySQLStore(options);

 // added section for express session
app.use(session({
  secret: '${process.env.SESSION_SECRET}',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true,
            maxAge: 2628000000}
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
