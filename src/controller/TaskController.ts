import { Get, Post, Put, Delete, Route, Tags, Query } from "tsoa";
import { LogSuccess } from "../utils/logger";
import { ITaskController } from "./interfaces";
import {
  createOneTask,
  deleteOneTask,
  getAllTasks,
  getOneTask,
  updateOneTask,
} from "../domain/orm/Task.orm";
import { ITask } from "@/domain/interfaces/ITask.interface";

@Route("/api/v1/tasks")
@Tags("TaskController")
export class TaskController implements ITaskController {
  @Get("/")
  public async getTasks(@Query() page: number, @Query() limit: number): Promise<any> {
    LogSuccess(`[/api/v1/tasks] The tasks are being got`);

    let response = await getAllTasks(page, limit);

    return response;
  }

  @Get("/:id")
  public async getTask(id: string): Promise<any> {
    LogSuccess(`The task with id ${id} is being got`);
    
    let response = await getOneTask(id);

    return response;
  }

  @Delete("/:id")
  public async deleteTask(id: string): Promise<any> {
    LogSuccess(`The task is being deleted`);

    let response = await deleteOneTask(id);

    return response;
  }

  @Put("/:id")
  public async updateTask(id: string, task: ITask): Promise<any> {
    LogSuccess(`The task is being updated`);

    let response = await updateOneTask(id, task);
    
    return response;
  }

  @Post("/")
  public async createTask(task: any): Promise<any> {
    LogSuccess(`The task is being created`);

    let response = await createOneTask(task);
    
    return response;
  }
}
