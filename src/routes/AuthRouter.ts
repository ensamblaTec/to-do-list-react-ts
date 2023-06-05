import express, { NextFunction, Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// bcrypt to passwords
import bcrypt from "bcrypt";

// Middleware
import { verifyToken } from "../middleware/verifyToken.middleware";

// Router from express
let authRouter = express.Router();

authRouter.route("/register").post(async (req: Request, res: Response) => {
  const { name, email, password, age, }: any = req.body;

  if (!name || !age || !email || !password) {
    return res.status(400).json({ message: "Failed to create and user" });
  }

  // Obtain the password in request
  let hashedPassword = bcrypt.hashSync(password, 8);

  // Create New User
  let newUser: IUser = {
    name,
    email,
    password: hashedPassword,
    age,
    admin: false,
  };

  // Controller instance
  const controller: AuthController = new AuthController();
  // Obtain response
  const response: any = await controller.registerUser(newUser);
  
  // Send response
  return res.status(201).json(response);
});

authRouter.route("/login").post(async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Failed to login" });
  }

  // Obtain the password in request
  // let hashedPassword = bcrypt.hashSync(password, 8);

  // Create New User
  let newUser: IAuth = {
    email,
    password,
  };

  // Controller instance
  const controller: AuthController = new AuthController();

  // Obtain response
  const response: any = await controller.loginUser(newUser);

  // Send response
  return res.status(200).json(response);
});

authRouter.route("/logout").post(async (req: Request, res: Response) => {
  const { email, password }: any = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Failed to logout" });
  }

  return undefined
});

// Route Protected by Verify Token
authRouter.route('/me').get(verifyToken, async (req: Request, res:Response, _: NextFunction)  => {
  // Obtain the ID of user to check it's data
  let id: any = req?.query?.id
  if(!id) {
    return res.status(401).send({message: 'User doesnt authorized'});
  }

  // Auth Controller
  const controller: AuthController = new AuthController();

  // Obtain response from Controller
  let response: any = await controller.userData(id);

  // if user auth
  return res.status(200).send(response);
})
export default authRouter;