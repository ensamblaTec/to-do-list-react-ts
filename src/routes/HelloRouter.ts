import express, { Request, Response } from 'express';
import { HelloController } from '../controller/HelloController';
import { LogInfo } from '../utils/logger';

// Router from express
let helloRouter = express.Router();

// GET -> http://localhost:8000/api/v1/hello?name=Martin/
helloRouter.route('/')
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        // Controller Instance to execute method
        const controller: HelloController = new HelloController();
        // Obtain Response
        const response = await controller.getMessage(name);
        // Send to the client the response
        return res.status(200).send(response);
    });

// Export Hello Router
export default helloRouter;
