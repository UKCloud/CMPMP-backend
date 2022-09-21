import express, { Request, Response, NextFunction } from 'express';
export const usersRouter = express.Router();
import { keycloakClient } from "../app";

/* GET users listing. */
usersRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  const user = { email: 'hello' };
  if (req.user) {
    keycloakClient.introspect(req.user.id_token).then((userInfo) => {
      res.json(userInfo);
    });
  }
});


