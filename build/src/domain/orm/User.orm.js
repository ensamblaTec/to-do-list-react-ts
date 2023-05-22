"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.deleteUserByID = exports.getUserByID = exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
// CRUD REQUEST
/**
 * Method to obtain all Users from Collection "users" in Mongo Server
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // User Model
        let userModel = (0, User_entity_1.userEntity)();
        // Search all users
        return yield userModel.find({});
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Users`);
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Method to obtain a one User from Collection "users" in Mongo Server
 */
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // User Model
        let userModel = (0, User_entity_1.userEntity)();
        // Get a user by ID
        return yield userModel.findById(id);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting User`);
    }
});
exports.getUserByID = getUserByID;
// Delete user by id
/**
 * Method to delete a one user from Collection 'users' in Mongo Server
 */
const deleteUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // User Model
        let userModel = (0, User_entity_1.userEntity)();
        // Delete a user by ID
        return yield userModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Deleting a user with id ${id}`);
    }
});
exports.deleteUserByID = deleteUserByID;
// Create new User
const createNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // User Model
        let userModel = (0, User_entity_1.userEntity)();
        // Create User
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating user`);
    }
});
exports.createNewUser = createNewUser;
// TODO
// GET user by email
// Delete user by email
// Update user by id
//# sourceMappingURL=User.orm.js.map