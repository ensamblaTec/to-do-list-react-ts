import { BasicResponse } from "../types";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Read all users from database
  getUsers(): Promise<any>;
  getUser(id: string): Promise<any>;
  deleteUser(id: string): Promise<any>;
  createUser(id: any): Promise<any>;
}

export interface ITaskController {
  // Read all Tasks
  getTasks(): Promise<any>;
  // Read One Task
  getTask(): Promise<any>;
  // Delete Task By ID
  deleteTask(id: string): Promise<any>;
  // Update Task By ID
  updateTask(id: string): Promise<any>;
  // Create Task
  createTask(task: JSON): Promise<any>;
}
