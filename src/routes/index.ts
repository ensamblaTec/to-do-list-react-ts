/**
 * Root Router
 * Redirections to Routers
 */

import express, { Response } from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "../utils/logger";

// Server instance
let server = express();

// Router instance
let rootRouter = express.Router();

// Activate for requests

// GET: http://localhost:8000/api/v1/
rootRouter.get("/", (_, res: Response) => {
  // Send message
  LogInfo('GET: http://localhost:8000/api/v1/')
  res.send("Hello world");
});

// Redirections to Routers & Controllers
server.use('/', rootRouter); // GET: http://localhost:8000/api/v1/
server.use('/hello', helloRouter); // GET: http://localhost:8000/api/v1/hello -> HelloRouter
// Add more routes to the app

export default server;