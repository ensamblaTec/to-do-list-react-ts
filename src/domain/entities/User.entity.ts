import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";
// Schema
export const userEntity = () => {
  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    age: { type: Date, required: false },
    admin: { type: Boolean, required: false },
  });

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
