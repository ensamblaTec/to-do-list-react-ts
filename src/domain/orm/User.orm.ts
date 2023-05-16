import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "@/utils/logger";

// CRUD REQUEST

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel  = userEntity()

        // Search all users
        return await userModel.find({isDelete: false})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users`)
    }
}

// TODO
// GET user by id
// GET user by email
// Delete user by id
// Delete user by email
// Create new User
// Update user by id