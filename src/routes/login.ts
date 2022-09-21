import express, { Request, Response, NextFunction } from 'express';
export const loginRouter = express.Router();
import passport from 'passport';

loginRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('oidc')(req, res, next);
})



