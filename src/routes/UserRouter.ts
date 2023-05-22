import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";

// Router from express
let userRouter = express.Router();

// GET -> http://localhost:8000/api/v1/users
userRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    // Controller Instance to execute method
    console.log(`HERE IS REQ: ${req}`)
    const controller: UserController = new UserController();
    // Obtain Response
    const response = await controller.getUsers();
    // Send to the client the response
    return res.status(200).send(response);
  })
  .post(async (req: Request, res: Response) => {
    const { name, email, age }: any = req.body;
    if (!name || !age || !email) {
      return res.status(400).json({message: "Failed"});
    }
    console.log(req.body);
    // Controller Instance to execute method
    const controller: UserController = new UserController();
    // Obtain a reponse
    const response = await controller.createUser(req.body)

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
    const id: any = req?.params?.id;
    const usr: any = await controller.getUser(id);
    const response = await controller.deleteUser(id);
    res.status(204).send({ usr, response });
  });

// Export Hello Router
export default userRouter;
