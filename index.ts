import express, { Express, response, request } from "express";
import dotenv from "dotenv";

// Configuration the .env file
dotenv.config();

// Create express app
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.get('/hello', (req, res) => {
  res.send('Welcome to GET Route: Hello')
});

app.listen(port, () => console.log(`STARTING SERVER: Running at http://localhost:${port}`));
