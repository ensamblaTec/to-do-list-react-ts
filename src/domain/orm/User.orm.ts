import { userEntity } from "../entities/User.entity";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";

// CRUD REQUEST

/**
 * Method to obtain all Users from Collection "users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    // User Model
    let userModel = userEntity();
    // Search all users
    return await userModel.find({});
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users`);
  }
};

/**
 * Method to obtain a one User from Collection "users" in Mongo Server
 */
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    // User Model
    let userModel = userEntity();
    // Get a user by ID
    return await userModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User`);
  }
};
// Delete user by id
/**
 * Method to delete a one user from Collection 'users' in Mongo Server
 */
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    // User Model
    let userModel = userEntity();
    // Delete a user by ID
    return await userModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting a user with id ${id}`);
  }
};
// Create new User
export const createNewUser = async (user: any): Promise<any | undefined> => {
  try {
    // User Model
    let userModel = userEntity();
    // Create User
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating user`);
  }
};
// TODO
// GET user by email
// Delete user by email
// Update user by id
