import { config } from "./config.js";
import createError from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import session from 'express-session';
import * as expressSession from 'express-session';
import expressMySQLSession from 'express-mysql-session';
import { Options } from 'express-mysql-session';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { indexRouter } from './routes/index';
import { usersRouter } from './routes/users';
import { loginRouter } from './routes/login';

import csrf from 'csurf';

// export const csrfProtection = csrf({ cookie: true});

export const app = express();

const sessionConfig:expressSession.SessionOptions = {
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 2628000000
  }
};

if (config.nodeEnv == "production") {
  const mySQLSessionConfig:Options = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
  }
  const MySQLStore = expressMySQLSession(expressSession);
  const sessionStore = new MySQLStore(mySQLSessionConfig);
  sessionConfig.store = sessionStore;
}

app.use(session(sessionConfig));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({cookie: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// app.get('/form', csrfProtection, function (req, res) {
//   // pass the csrfToken to the view
//   console.log(req.csrfToken());
//   res.render('send', { csrfToken: req.csrfToken() })
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

