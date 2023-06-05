import express, { Request, Response } from "express";
import { TaskController } from "../controller/TaskController";
import { ITask } from "../domain/interfaces/ITask.interface";

// Router from express
let taskRouter = express.Router();

// GET -> http://localhost:8000/api/v1/tasks
taskRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    // Controller instance to execute a method
    const controller: TaskController = new TaskController();
    const limit = req?.params?.limit || 10;
    const page = req?.params?.page || 1;
    // Obtain a response
    const response = await controller.getTasks(+page, +limit);
    // return a response
    return res.status(200).send(response);
  })
  .post(async (req: Request, res: Response) => {
    
    // Obtain a body request
    const { title, description, owner }: any = req?.body;
    // verify values
    if (!title || !description || !owner) {
      return res
        .status(400)
        .json({ message: "Verify that the task have all properties" });
    }
    // Create json object
    const task: ITask = {
      title,
      description,
      owner,
      created_at: new Date(),
    };
    // Controller instance to execute a method
    const controller: TaskController = new TaskController();
    // Obtain a response
    const response = await controller.createTask(task);
    return res.status(201).send(response);
  });

// GET -> http://localhost:8000/api/v1/task/:id2
taskRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    // Controller instance to execute a method
    const controller: TaskController = new TaskController();
    // Obtain a response
    const response = await controller.getTask(req.params?.id);

    return res.status(200).json(response);
  })
  .put(async (req: Request, res: Response) => {
    // Controller instnace to execute a method
    const controller: TaskController = new TaskController();
    const { title, description }: any = req?.body;
    const data = {
      title: title,
      description: description,
      updated_at: new Date(),
    };
    // Obtain a response
    const response = await controller.updateTask(req.params?.id, data);

    return res.status(200).json(response);
  })
  .delete(async (req: Request, res: Response) => {
    // controller instance to execute a method
    const controller: TaskController = new TaskController();
    // Obtain a response
    const response = await controller.deleteTask(req.params?.id);

    return res.status(200).json(response);
  });

export default taskRouter;
