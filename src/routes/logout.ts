import express, {Request, Response, NextFunction} from 'express';
import qs from 'query-string';
export const logoutRouter = express.Router();
import { config } from "../config.js";

logoutRouter.get('/', function(req:Request, res:Response, next:NextFunction) {
  req.session.destroy(() => {
    res.json({message:"Logged Out"})
});
  const data = qs.stringify({
    post_logout_redirect_uri: config.logoutRedirectURI ,
    client_id: process.env.CLIENT_ID
  })
  res.redirect(`${process.env.KEYCLOAK_LOGOUT_ENDPOINT}?${data}`)
});

