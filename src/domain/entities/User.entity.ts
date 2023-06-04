import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";
// Schema
export const userEntity = () => {
  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Date, required: true },
    admin: { type: Boolean, required: true, default: false },
  });

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
