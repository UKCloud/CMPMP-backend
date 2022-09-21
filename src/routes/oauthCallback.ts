import express, { Request, Response, NextFunction } from 'express';
export const oauthCallbackRouter = express.Router();
import passport from 'passport';
import { config } from '../config';

/* GET oauth-callback. */
oauthCallbackRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('oidc', {
    successRedirect: config.cmpmpFrontEnd,
    failureRedirect: '/bad'
  })(req, res, next);
});
