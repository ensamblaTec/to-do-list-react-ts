import { UserResponse } from "../types/UsersResponse.types";
import { userEntity } from "../entities/User.entity";
import { LogError, LogInfo, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// environment
import dotenv from "dotenv";
dotenv.config();
const secret: any = process.env.SECRETKEY;

// Authentication
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// CRUD REQUEST

/**
 * Method to obtain all Users from Collection "users" in Mongo Server
 */
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<UserResponse | undefined> => {
  try {
    // User Model
    let userModel = userEntity();
    // Response
    let response: UserResponse = {
      users: [],
      totalPages: 1,
      currentPage: page,
    };

    // Query
    await userModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .select({
        name: 1,
        email: 1,
        age: 1,
        admin: 1,
      })
      .exec()
      .then((users: IUser[]) => {
        console.log(users);

        response.users = users;
      });
    // Count total documents in collection 'users'
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    // Search all users
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users ${error}`);
    return undefined;
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

    let userFound: IUser | undefined = undefined;
    let token = undefined;

    await userModel
      .findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user;
      })
      .catch((error) => {
        console.error(`[ERROR Authentication ORM] User not Found`);
        throw new Error(`[ERROR Authentication ORM] User not Found: ${error}`);
      });

    if (!userFound) {
      return undefined;
    }

    // Use bcrypt to compare passwords
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);
    if (!validPassword) {
      console.error(`[ERROR Authentication ORM] User not Found`);
      throw new Error(`[ERROR Authentication ORM] User not Found:`);
    }

    // Create JWT
    // Secret is in .env
    token = jwt.sign(
      { email: userFound!.email, admin: userFound!.admin },
      secret,
      {
        expiresIn: 7200,
      }
    );

    return {
      user: userFound,
      token: token,
    };
  } catch (error) {
    LogError(`[ORM ERROR] Login user ${error}`);
    return undefined;
  }
};
// Logout User
export const logoutUser = async (user: IUser): Promise<any | undefined> => {};

// TODO
// GET user by email
// Delete user by email
// Update user by id
