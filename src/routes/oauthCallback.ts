import express, {Request, Response, NextFunction} from 'express';
export const oauthCallback = express.Router();
import qs from 'query-string';
import axios from 'axios';


/* GET oauth-callback. */
oauthCallback.get('/', function(req:Request, res:Response, next:NextFunction) {
  const stateFromServer = req.query.stateFromServer;
  if(stateFromServer !== req.csrfToken()) {
    console.log("Session state does not match");
    res.writeHead(500);
    return;
  }

  axios
    .post(
      `${process.env.KEYCLOAK_TOKEN_ENDPOINT}`,
      qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    .then((result) => {
      req.csrfToken= result.data.access_token;
      // console.log(req.session.token)
      // console.log(result);
      res.redirect("http://localhost:5173/");
    })
    .catch((err: any) => {
      console.log(err);
    });
});
