import { config } from "./config.js" ;
import createError from 'http-errors';
import express from 'express';
import session from 'express-session'; 
import * as expressSession from 'express-session'; 
import expressMySQLSession from 'express-mysql-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {indexRouter} from './routes/index.js';
import {usersRouter} from './routes/users.js';
import { fileURLToPath } from "url";
export const app = express();


let mySQLSessionConfig = {
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database
 }
 
  var sessionStore = new expressMySQLSession(mySQLSessionConfig);  

    const sessionConfig =
  {
      secret: config.secret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true,
           maxAge: 2628000000}
    };

  if (config.nodeEnv == "production"){ 
      sessionConfig.store = sessionStore
    };

    app.use(session(sessionConfig));
  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

