import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// bcrypt to passwords
import bcrypt from "bcrypt";

// Router from express
let authRouter = express.Router();

authRouter.route("/auth/register").post(async (req: Request, res: Response) => {
  const { name, email, password, age, status, admin }: any = req.body;

  if (!name || !age || !email || !status || !admin || !password) {
    return res.status(400).json({ message: "Failed" });
  }

  // Obtain the password in request
  let hashedPassword = bcrypt.hashSync(password, 8);

  // Create New User
  let newUser: IUser = {
    name,
    email,
    password: hashedPassword,
    age,
    status,
    admin,
  };

  // Controller instance
  const controller: AuthController = new AuthController();

  // Obtain response
  const response: any = await controller.registerUser(newUser);

  // Send response
  return res.status(200).json(response);
});

authRouter.route("/auth/login").post(async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Failed" });
  }

  // Obtain the password in request
  let hashedPassword = bcrypt.hashSync(password, 8);

  // Create New User
  let newUser: IAuth = {
    email,
    password: hashedPassword,
  };

  // Controller instance
  const controller: AuthController = new AuthController();

  // Obtain response
  const response: any = await controller.loginUser(newUser);

  // Send response
  return res.status(200).json(response);
});

authRouter.route("/auth/logout").post(async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Failed" });
  }
});
