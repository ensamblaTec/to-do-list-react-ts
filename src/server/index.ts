import express, { Express, Request, Response } from "express";

// Environment Variables
import dotenv from "dotenv";

// Swagger
import SwaggerUi from "swagger-ui-express";

// Security
import cors from "cors";
import helmet from "helmet";

// Https

// Root Router
import routes from "../routes";
import mongoose from "mongoose";

// Configuration the .env file
dotenv.config();

// Create express app
const server: Express = express();

// * Security Config
server.use(helmet());
server.use(cors());

// * Content Type Config
server.use(express.json());
server.use(express.urlencoded({ extended: true}));
// server.use(bodyParser.json());

// * Swagger Config and Router
server.use(
  "/docs",
  SwaggerUi.serve,
  SwaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
      explorer: true,
    },
  })
);

// Define SERVER to use /api/v1 and execute rootRouter
// From this point onover:  http://localhost:8000/api/v1/...
server.use("/api/v1", routes);

// Static sever
server.use(express.static("public"));

// TODO: Mongoose Connection
mongoose.connect(
  `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.URL_MONGO}/${process.env.BD_MONGO}?retryWrites=true&w=majority`
);

// * Redirections Config
// http://localhost:8000/ -> http://localhost:8000/api
server.get("/", (req: Request, res: Response) => {
  res.redirect("/api/v1");
});

export default server;
