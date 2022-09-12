import express, {Request, Response, NextFunction} from 'express';
// import { csrfProtection } from '../app';
export const loginRouter = express.Router();

loginRouter.get('/test', function(req:Request, res:Response) {
    // pass the csrfToken to the view
    console.log(req.csrfToken());
    res.redirect(`${process.env.KEYCLOAK_AUTH_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&state=${req.csrfToken()}`)
  })

// loginRouter.get('/', csrfProtection, function(req:Request, res:Response, next:NextFunction) {
//     const stateValue = Math.random().toString(16).substring(2, 15);

//     console.log(req.csrfToken());
//     // req.session.stateValue = stateValue
//     
//   });

  
