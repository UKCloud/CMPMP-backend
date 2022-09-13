import express, {Request, Response, NextFunction} from 'express';
import axios from 'axios';
export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req:Request, res:Response, next:NextFunction) {
  const user = { email: 'hello'};
  // if (req.csrfToken()) {
  //   axios
  //     .post(
  //       process.env.KEYCLOAK_INTROSPECTION_ENDPOINT,
  //       qs.stringify({
  //         client_id: process.env.CLIENT_ID,
  //         client_secret: process.env.CLIENT_SECRET,
  //         token: req.session.token
  //       }))
  //     .then((result) => {
  //       db.User.findAll({
  //         where:{
  //           sid:result.data.sid
  //         }
  //       })
  //       .then((searchresult) => {
  //       if(searchresult=== 0){
  //       //console.log(result.data);
  //      db.User.create({
  //         firstName:result.data.given_name,
  //         lastName:result.data.family_name,
  //         sid:result.data.sid
  //       })
  //     }
  //     })
      
        
  //       res.send(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  
  // } else {
  //   console.log("no token");
  //   res.send({});
  // }
});


// usersRouter.get('/user', function(req:Request, res:Response, next:NextFunction) {
//   var user = { email: 'hello'};
// });