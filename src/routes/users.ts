import express, {Request, Response, NextFunction, Router} from 'express';
export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});


// usersRouter.get('/user', function(req:Request, res:Response, next:NextFunction) {
//   var user = { email: 'hello'};
// });