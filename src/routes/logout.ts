import express, {Request, Response, NextFunction} from 'express';
import qs from 'query-string';
export const logoutRouter = express.Router();

logoutRouter.get('/', function(req:Request, res:Response, next:NextFunction) {
  req.csrfToken();
  const data = qs.stringify({
    post_logout_redirect_uri: "http://localhost:5173",
    client_id: process.env.CLIENT_ID
  })
  res.redirect(`${process.env.KEYCLOAK_LOGOUT_ENDPOINT}?${data}`)
});

