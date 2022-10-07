import express, { Request, Response, NextFunction } from 'express';
export const logoutRouter = express.Router();
import { keycloakClient } from "../app";

logoutRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    const id_token = req.user.id_token;
    req.logOut({ keepSessionInfo: false }, () => {
      res.redirect(keycloakClient.endSessionUrl({ id_token_hint: id_token }));
    })
  }
  else {
    res.redirect('/')
  }
});