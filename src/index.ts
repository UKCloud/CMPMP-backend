import express, { Request, Response, NextFunction } from 'express';
import { Application } from 'express-serve-static-core';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
// import { app } from '../app';
import PingController from "./routes/ping"
// import Router from "./routes";
export const swaggerRouter = express.Router();

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(swaggerRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});