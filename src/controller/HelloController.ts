import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

export class HelloController implements IHelloController {
    async getMessage(name?: string): Promise<BasicResponse> {
        LogSuccess('[/api/v1/hello] Get Request')

        return {
            message: `Hello ${name || 'undefined'}`
        }
    }
}