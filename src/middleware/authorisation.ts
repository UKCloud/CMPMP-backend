import { Request, Response, NextFunction } from "express"
import { keycloakClient } from "../app";
import { PrismaClient } from '@prisma/client';
import { use } from "passport";
const prisma = new PrismaClient()

export const isLoggedIn = (req:Request<unknown,unknown,unknown,unknown>, res:Response, next:NextFunction) => {
  // Check if there is a user associated with this session
  if (req.isAuthenticated()) {
    return next();
  } else return res.status(401).json({status:"Not logged in"});
}

export const isAuthorised = (requiredRole:string) => {
  // Inner function required as isAuthorised takes a custom parameter
  return (req:Request, res:Response, next:NextFunction) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Get user info using the session access token
      keycloakClient.introspect(String(req.user?.id_token)).then((userInfo) => {
        // Lookup the user in the users table, using the SID primary key
        prisma.users.findUnique({
          where :{
            sub : userInfo.sub
          }
        }).then((user) => {
          // Check if the user's role matches the required role
          if (user?.role == requiredRole){
            return next();
          } 
          else {
            // If it does not, return not permitted JSON response
            return res.status(403).json({status:"Not permitted"});
          }
        })
      });
    // If the user is not logged in, return not logged in JSON response
    } else return res.status(401).json({status:"Not logged in"});
  }
}
