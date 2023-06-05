import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { BasicResponse } from "../controller/types";
import { IUser } from "../domain/interfaces/IUser.interface";
222
// bcrypt to passwords
import bcrypt from "bcrypt";

// Router from express
let userRouter = express.Router();

// GET -> http://localhost:8000/api/v1/users
userRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    // Controller Instance to execute method
    const controller: UserController = new UserController();
    const limit = req?.params?.limit || 10
    const page = req?.params?.page || 1

    // Obtain Response
    const response = await controller.getUsers(+page, +limit);
    // Send to the client the response
    return res.status(200).send(response);
  })
  .post(async (req: Request, res: Response) => {
    const { name, email, password, age, status, admin }: any = req.body;

    if (!name || !age || !email || !status || !admin || !password) {
      return res.status(400).json({ message: "Failed" });
    }

    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain a reponse
    const response = await controller.createUser(req.body);
    // return a response
    return res.status(201).json(response);
  });

// GET -> http://localhost:8000/api/v1/users/:id
userRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain response
    const response = await controller.getUser(req.params?.id);
    // Send to the client the response
    return res.status(200).send(response);
  })
  .delete(async (req: Request, res: Response) => {
    // Controller Instance to execute a method
    const controller: UserController = new UserController();
    // Get a param ID
    const id: string = req?.params?.id || "";

    const response: BasicResponse = await controller.deleteUser(id);

    return res.status(200).send(response);
  });

export default userRouter;
