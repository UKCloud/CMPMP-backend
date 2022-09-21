import express, { Request, Response, NextFunction } from 'express';
export const indexRouter = express.Router();
import * as dotenv from "dotenv";
dotenv.config();

/* GET home page. */
indexRouter.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

