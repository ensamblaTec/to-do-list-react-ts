import { ITask } from "../interfaces/ITask.interface";

export type TaskResponse = {
    tasks: ITask[];
    totalPages: number;
    currentPage: number;
}