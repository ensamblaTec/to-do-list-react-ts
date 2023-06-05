import { taskEntity } from "../entities/Task.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { ITask } from "../interfaces/ITask.interface";
import { TaskResponse } from "../types/TaskResponse.types";

/**
 * Method to obtain all tasks from Collection 'tasks' in Mongo Server
 */
export const getAllTasks = async (
  page: number,
  limit: number
): Promise<TaskResponse | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Response
    let response: TaskResponse = {
      tasks: [],
      totalPages: 1,
      currentPage: page,
    };
    // Search all tasks and return
    await taskModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .select({
        title: 1,
        description: 1,
        owner: 1,
        tag: 1,
        created_at: 1,
      })
      .exec()
      .then((tasks: ITask[]) => {
        response.tasks = tasks;
      });
    // Count total documents in collection 'users'
    await taskModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: cannot get all tasks ${error}`);
    return undefined;
  }
};

export const getOneTask = async (id: string): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Search one task by ID
    return await taskModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: cannot get task with id ${error}`);
  }
};

export const deleteOneTask = async (id: string): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Delete one task by ID
    return await taskModel.findByIdAndDelete({ _id: id }, { new: true });
  } catch (error) {
    LogError(`[ORM ERROR]: cannot delete task with id ${id} ${error}`);
  }
};

export const updateOneTask = async (
  id: string,
  task: ITask
): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Update one task by ID
    return await taskModel.findByIdAndUpdate({ _id: id }, task, {
      new: true,
    });
  } catch (error) {
    LogError(`[ORM ERROR]: cannot update task with id ${id} ${error}`);
  }
};

export const createOneTask = async (task: any): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Create one task
    return await taskModel.create(task);
  } catch (error) {
    LogError(`[ORM ERROR]: cannot create task ${error}`);
  }
};
