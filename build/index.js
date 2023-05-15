"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuration the .env file
dotenv_1.default.config();
// Create express app
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.get('/hello', (req, res) => {
    res.send('Welcome to GET Route: Hello');
});
app.listen(port, () => console.log(`STARTING SERVER: Running at http://localhost:${port}`));
//# sourceMappingURL=index.js.map