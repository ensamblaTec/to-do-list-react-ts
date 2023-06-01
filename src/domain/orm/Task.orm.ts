import { taskEntity } from "../entities/Task.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { ITask } from "../interfaces/ITask.interface";

/**
 * Method to obtain all tasks from Collection 'tasks' in Mongo Server
 */
export const getAllTasks = async (): Promise<any[] | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Search all tasks and return
    return await taskModel.find({});
  } catch (error) {
    LogError(`[ORM ERROR]: cannot get all tasks ${error}`);
  }
};

export const getOneTask = async (id: string): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Search one task by ID
    return await taskModel.findById({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: cannot get task with id ${error}`);
  }
};

export const deleteOneTask = async (id: string): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Delete one task by ID
    return await taskModel.findByIdAndDelete({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: cannot delete task with id ${id} ${error}`);
  }
};

export const updateOneTask = async (id: string): Promise<any | undefined> => {
  try {
    // Task Model
    const taskModel = taskEntity();
    // Update one task by ID
    return await taskModel.findByIdAndUpdate({ _id: id });
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
