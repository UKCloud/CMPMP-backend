import { config } from "./config.js";
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
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
import { logoutRouter } from './routes/logout';
import { oauthCallbackRouter } from './routes/oauthCallback';

import csrf from 'csurf';
import passport from 'passport';
import { Client, Issuer, Strategy, TokenSet } from "openid-client";
import cors from 'cors';

import { User } from "./models/users";

export const csrfProtection = csrf({ cookie: true });

export const app = express();

// Sync the users table with the database
User.sync({
  alter: true,
});

const sessionConfig: expressSession.SessionOptions = {
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 2628000000
  }
};

if (config.nodeEnv == "production") {
  const mySQLSessionConfig: Options = {
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
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(csrf({ cookie: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/oauth-callback', oauthCallbackRouter);

export let keycloakClient: Client;


Issuer.discover(config.keycloakRealm).then((issuer) => {
  keycloakClient = new issuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uris: [config.redirectURI],
    post_logout_redirect_uris: [config.logoutRedirectURI],
    response_types: ['code'],
  })

  passport.use("oidc", new Strategy({ client: keycloakClient }, (tokenSet: TokenSet, userinfo: unknown, done: (arg0: null, arg1: TokenSet|null) => unknown) => {
    const claims = tokenSet.claims()
    // On login, add the user to the database if they do not exist yet
    User.findByPk(claims.sub).then((existingUser) => {
      // If the user does not exist in the DB, add them
      if (!existingUser) {
        User.create({
          sub: claims.sub,
          name: claims.username,
          role: "user" // default role for a new user
        })
        .then(() => {
          return done(null, tokenSet);
        })
        .catch(() => {
          return done(null, null);
        })
      } else {
        // If the user does exist, just return the user info to callback
        return done(null, tokenSet);
      }
    })
  }));

  passport.serializeUser(function (user: unknown, callback) {
    callback(null, user);
  });

  passport.deserializeUser(function (user: Express.User, callback) {
    callback(null, user);
  });

  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
})



