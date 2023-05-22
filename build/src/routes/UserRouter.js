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
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controller/UsersController");
// Router from express
let userRouter = express_1.default.Router();
// GET -> http://localhost:8000/api/v1/users
userRouter
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Controller Instance to execute method
    console.log(`HERE IS REQ: ${req}`);
    const controller = new UsersController_1.UserController();
    // Obtain Response
    const response = yield controller.getUsers();
    // Send to the client the response
    return res.status(200).send(response);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age } = req.body;
    if (!name || !age || !email) {
        return res.status(400).json({ message: "Failed" });
    }
    console.log(req.body);
    // Controller Instance to execute method
    const controller = new UsersController_1.UserController();
    // Obtain a reponse
    const response = yield controller.createUser(req.body);
    return res.status(201).json(response);
}));
// GET -> http://localhost:8000/api/v1/users/:id
userRouter
    .route("/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Controller Instance to execute method
    const controller = new UsersController_1.UserController();
    // Obtain response
    const response = yield controller.getUser((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    // Get a param ID
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const usr = yield controller.getUser(id);
    const response = yield controller.deleteUser(id);
    res.status(204).send({ usr, response });
}));
// Export Hello Router
exports.default = userRouter;
//# sourceMappingURL=UserRouter.js.map