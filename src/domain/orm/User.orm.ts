import { userEntity } from "../entities/User.entity";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    // Create
    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Register user`);
  }
};

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    // Find user by email
    userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
      if (err) {
        return { message: "something has happened" };
      }
      if (!user) {
        return { message: "user not found" };
      }

      // Use bcrypt to compare passwords
      let validPassword = bcrypt.compareSync(auth.password, user.password);

      if (!validPassword) {
        return { message: "not authorized to this route", status: 401 };
      }

      // Create JWT
      // Secret is in .env
      let token = jwt.sign(
        { email: user.email, admin: user.admin },
        "SECRETPASSWORD",
        {
          expiresIn: 7200,
        }
      );
      return token;
    });
  } catch (error) {
    LogError(`[ORM ERROR]: Login user`);
  }
};
// Logout User
export const logoutUser = async (user: IUser): Promise<any | undefined> => {};

// TODO
// GET user by email
// Delete user by email
// Update user by id
