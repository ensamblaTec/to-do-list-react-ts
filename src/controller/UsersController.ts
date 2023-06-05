import { Delete, Get, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogInfo } from "../utils/logger";
// ORM
import {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  createNewUser,
} from "../domain/orm/User.orm";
import { BasicResponse } from "./types";

@Route("/api/v1/users")
@Tags("UserController")
export class UserController implements IUserController {
  /**
   * Endpoint to retreive the users in the Collection "users" of Mongo Server
   * @returns All users
   */
  @Get("/")
  public async getUsers(@Query() page: number, @Query() limit: number): Promise<any> {
    LogSuccess("[/api/v1/users] Get All Users Request");

    const response = await getAllUsers(page, limit);

    return response;
  }

  @Get("/:id")
  public async getUser(@Query() id: string): Promise<any> {
    /**
     * Endpoint to retreive the user in the Collection "users" of Mongo Server
     * @param {string} id ID user
     * @returns A user
     */
    LogSuccess("[/api/v1/users/:id]: Get user Request");
    const response = await getUserByID(id);
    return response;
  }

  @Delete("/:id")
  public async deleteUser(@Query() id: string): Promise<BasicResponse> {
    /**
     * Endpoint to delete an user in the Collection 'users' of Mongo Server
     * @param {string} id ID user
     * @returns Status and Deleted User
     */
    LogSuccess(`The user with ID ${id} is being deleted`);
    let response: BasicResponse = {
      message: `The user with id ${id} hasn't been deleted`,
    };
    await deleteUserByID(id).then(() => {
      response = {
        message: `The user with id ${id} has been deleted`,
      };
    });
    return response;
  }

  @Put("/")
  public async createUser(user: any): Promise<any> {
    /**
     * Endpoint to create an user in the Collection 'users' of Mongo Server
     * @param {JSON} user with user info
     * @returns Status and user info
     */
    LogSuccess(`The user with info ${user} is being created`);
    const response = await createNewUser(user).then((usr) => {
      LogInfo(`The user has been created: ${usr}`);
    });
    return response;
  }
}
