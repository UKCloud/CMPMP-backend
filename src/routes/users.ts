import express, {Request, Response, NextFunction} from 'express';
export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send({user: {email: 'hello world'}});
});


// usersRouter.get('/user', function(req:Request, res:Response, next:NextFunction) {
//   var user = { email: 'hello'};
// });