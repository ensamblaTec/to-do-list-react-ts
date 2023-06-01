"use strict";
/**
 * Root Router
 * Redirections to Routers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HelloRouter_1 = __importDefault(require("./HelloRouter"));
const logger_1 = require("../utils/logger");
const UserRouter_1 = __importDefault(require("./UserRouter"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const TaskRouter_1 = __importDefault(require("./TaskRouter"));
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
// Server instance
let server = (0, express_1.default)();
// Router instance
let rootRouter = express_1.default.Router();
// Activate for requests 
// GET: http://localhost:8000/api/v1/
rootRouter.get("/", (_, res) => {
    // Send message
    (0, logger_1.LogInfo)("GET: http://localhost:8000/api/v1/");
    res.send("Hello world");
});
// Redirections to Routers & Controllers
server.use("/", rootRouter); // GET: http://localhost:8000/api/v1/
server.use("/hello", HelloRouter_1.default); // GET: http://localhost:8000/api/v1/hello -> HelloRouter
server.use("/users", verifyToken_middleware_1.verifyToken, UserRouter_1.default); // GET: http://localhost:8000/api/v1/users -> UserRouter
server.use("/auth", AuthRouter_1.default); // GET: http://localhost:8000/api/v1/auth -> AuthRouter
server.use("/tasks", verifyToken_middleware_1.verifyToken, TaskRouter_1.default); // GET: http://localhost:8000/api/v1/task -> TasksRouter
// Add more routes to the app
exports.default = server;
//# sourceMappingURL=index.js.map