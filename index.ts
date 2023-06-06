import dotenv from 'dotenv';
import server from './src/server';
import { LogError, LogSuccess } from './src/utils/logger';

// * Configuration the .env file
dotenv.config();

const port: any = process.env.PORT || 8000;
// const url: string = "ec2-44-210-90-241.compute-1.amazonaws.com"
// Execute SERVER
server.listen(port, () => {
  LogSuccess(`[SERVER ON]: Running at http://localhost:${port}`);
});

// * Control SERVER ERROR
server.on('error', (error) => {
  LogError(`[SERVER ERROR]: ${error}`);
});
