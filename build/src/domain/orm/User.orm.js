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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = exports.createNewUser = exports.deleteUserByID = exports.getUserByID = exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
// environment
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRETKEY;
// Authentication
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// CRUD REQUEST
/**
 * Method to obtain all Users from Collection "users" in Mongo Server
 */
const getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // User Model
        let userModel = (0, User_entity_1.userEntity)();
        // Response
        let response = {
            users: [],
            totalPages: 1,
            currentPage: page,
        };
        // Query
        yield userModel
            .find({ isDeleted: false })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((users) => {
            response.users = users;
        });
        // Count total documents in collection 'users'
        yield userModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        // Search all users
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Users`);
        return undefined;
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
// Register User
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Create
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Register user`);
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        let userFound = undefined;
        let token = undefined;
        yield userModel
            .findOne({ email: auth.email })
            .then((user) => {
            userFound = user;
        })
            .catch((error) => {
            console.error(`[ERROR Authentication ORM] User not Found`);
            throw new Error(`[ERROR Authentication ORM] User not Found: ${error}`);
        });
        // Use bcrypt to compare passwords
        let validPassword = bcrypt_1.default.compareSync(auth.password, userFound.password);
        if (!validPassword) {
            console.error(`[ERROR Authentication ORM] User not Found`);
            throw new Error(`[ERROR Authentication ORM] User not Found:`);
        }
        // Create JWT
        // Secret is in .env
        token = jsonwebtoken_1.default.sign({ email: userFound.email, admin: userFound.admin }, secret, {
            expiresIn: 7200,
        });
        return {
            user: userFound,
            token: token,
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Login user`);
    }
});
exports.loginUser = loginUser;
// Logout User
const logoutUser = (user) => __awaiter(void 0, void 0, void 0, function* () { });
exports.logoutUser = logoutUser;
// TODO
// GET user by email
// Delete user by email
// Update user by id
//# sourceMappingURL=User.orm.js.map