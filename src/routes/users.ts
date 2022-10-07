import express, { Request, Response } from 'express';
export const usersRouter = express.Router();
import { keycloakClient } from "../app";
import UserController from '../controllers/users';
import { isLoggedIn } from '../middleware/authorisation';

/* GET users listing. */
usersRouter.get('/', isLoggedIn, async function (req: Request, res: Response) {
  const controller = new UserController();
  const response = await controller.findUserById(req);
  return res.json(response);

});