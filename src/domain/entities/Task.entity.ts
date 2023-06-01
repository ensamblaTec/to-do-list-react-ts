import mongoose from "mongoose";
import { ITask } from "../interfaces/ITask.interface";
// Schema
export const taskEntity = () => {
  let taskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: {type: String, required: true },
    tag: { type: [], required: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: false },
  });

  return mongoose.models.tasks || mongoose.model<ITask>('tasks', taskSchema);
};
