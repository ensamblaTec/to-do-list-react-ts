import { IAuth } from "../../domain/interfaces/IAuth.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse } from "../types";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Read all users from database
  getUsers(page: number, limit: number): Promise<any>;
  getUser(id: string): Promise<any>;
  deleteUser(id: string): Promise<any>;
  createUser(id: any): Promise<any>;
}

export interface ITaskController {
  // Read all Tasks
  getTasks(): Promise<any>;
  // Read One Task by ID
  getTask(id: string, type: string): Promise<any>;
  // Delete Task By ID
  deleteTask(id: string): Promise<any>;
  // Update Task By ID
  updateTask(id: string): Promise<any>;
  // Create Task
  createTask(task: any): Promise<any>;
}

export interface IAuthController {
  // register users
  registerUser(user: IUser): Promise<any>
  // login users
  loginUser(auth: IAuth): Promise<any>
  // logout user
  logoutUser(): Promise<any>
}
