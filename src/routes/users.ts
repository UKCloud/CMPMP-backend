import express, { Request, Response } from 'express';
export const usersRouter = express.Router();
import { keycloakClient } from "../app";
import { isLoggedIn } from '../middleware/authorisation';

/* GET users listing. */
usersRouter.get('/', isLoggedIn, function (req: Request, res: Response) {
  keycloakClient.introspect(String(req.user?.id_token)).then((userInfo) => {
    res.json(userInfo);
  });
});