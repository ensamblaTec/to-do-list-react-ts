import { Get, Post, Put, Delete, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { LogSuccess, LogError } from "../utils/logger";
import { ITaskController } from "./interfaces";
import {
  createOneTask,
  deleteOneTask,
  getAllTasks,
  getOneTask,
  updateOneTask,
} from "../domain/orm/Task.orm";

@Route("/api/v1/tasks")
@Tags("TaskController")
export class TaskController implements ITaskController {
  @Get("/")
  public async getTasks(): Promise<any> {
    LogSuccess(`The tasks are being got`);
    let response = { message: `Cannot get all tasks` };
    await getAllTasks().then((task) => {
      LogSuccess(`Task get successfully ${task}`);
      response = {
        message: `${task}`,
      };
    });
    return response;
  }

  @Get("/:id")
  public async getTask(id: string): Promise<any> {
    LogSuccess(`The task with id ${id} is being got`);
    let response = { message: `Cannot get task with id ${id}` };
    await getOneTask(id).then((task) => {
      LogSuccess(`Task gotten succesfully ${task}`);
      response = {
        message: task,
      };
    });
    return response;
  }

  @Delete("/:id")
  public async deleteTask(id: string): Promise<any> {
    LogSuccess(`The task is being deleted`);
    let response = { message: `Cannot delete task with id ${id}` };
    await deleteOneTask(id).then((task) => {
      LogSuccess(`Task deleted successfully ${task}`);
      response = {
        message: task,
      };
    });
    return response;
  }

  @Put("/:id")
  public async updateTask(id: string): Promise<any> {
    LogSuccess(`The task is being updated`);
    let response = { message: `Cannot update task with id ${id}` };
    await updateOneTask(id).then((task) => {
      LogSuccess(`Task updated successfully ${task}`);
      response = {
        message: task,
      };
    });
    return response;
  }

  @Post("/")
  public async createTask(task: any): Promise<any> {
    LogSuccess(`The task is being created`);
    let response = { message: `cannot create task with this properties` };
    await createOneTask(task).then((tsk) => {
      LogSuccess(`Task created successfully ${task}`);
      response = {
        message: `${tsk}`,
      };
    });
    return response;
  }
}
