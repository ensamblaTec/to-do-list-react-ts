import express, { Request, Response } from "express";
import { TaskController } from "../controller/TaskController";
import { BasicResponse } from "../controller/types";
import { LogInfo } from "../utils/logger";
import { ITask } from "../domain/interfaces/ITask.interface";

// Router from express
let taskRouter = express.Router();

// GET -> http://localhost:8000/api/v1/tasks
taskRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    // Controller instance to execute a method
    const controller: TaskController = new TaskController();
    // Obtain a response
    const response = await controller.getTasks();
    // return a response
    return res.status(200).send(response.message);
  })
  .post(async (req: Request, res: Response) => {
    // Obtain a body request
    const { title, description, tag, owner, created_at, updated_at }: any =
      req?.body;
    // verify values
    if (
      !title ||
      !description ||
      !tag ||
      !owner ||
      !created_at ||
      !updated_at
    ) {
      return res
        .status(400)
        .json({ message: "Verify that the task have all properties" });
    }
    // Create json object
    const task: ITask = {
      title,
      description,
      tag,
      owner,
      created_at,
      updated_at,
    };
    // Controller instance to execute a method
    const controller: TaskController = new TaskController();
    // Obtain a response
    const response = await controller.createTask(task);
    return res.send(response);
  });

// GET -> http://localhost:8000/api/v1/task/:id2
taskRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    // Controller instance to execute a method
    const controller: TaskController = new TaskController();
    // Obtain a response
  })
  .delete(async (req: Request, res: Response) => {})
  .put(async (req: Request, res: Response) => {});

export default taskRouter;
