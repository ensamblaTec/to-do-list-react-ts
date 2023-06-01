"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Environment Variables
const dotenv_1 = __importDefault(require("dotenv"));
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Security
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// Https
// Root Router
const routes_1 = __importDefault(require("../routes"));
const mongoose_1 = __importDefault(require("mongoose"));
// Configuration the .env file
dotenv_1.default.config();
// Create express app
const server = (0, express_1.default)();
// * Security Config
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
// * Content Type Config
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
// server.use(bodyParser.json());
// * Swagger Config and Router
server.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
        explorer: true,
    },
}));
// Define SERVER to use /api/v1 and execute rootRouter
// From this point onover:  http://localhost:8000/api/v1/...
server.use("/api/v1", routes_1.default);
// Static sever
server.use(express_1.default.static("public"));
// TODO: Mongoose Connection
mongoose_1.default.connect(`mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.URL_MONGO}/${process.env.BD_MONGO}?retryWrites=true&w=majority`);
// * Redirections Config
// http://localhost:8000/ -> http://localhost:8000/api
server.get("/", (req, res) => {
    res.redirect("/api/v1");
});
exports.default = server;
//# sourceMappingURL=index.js.map