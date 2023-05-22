import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";
// Schema
export const userEntity = () => {
  // let userSchema = new mongoose.Schema({
  //   name: String,
  //   email: String,
  //   age: Number,
  //   status: Boolean,
  //   admin: Boolean,
  // });

  let userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    status: { type: Boolean, required: true },
    admin: { type: Boolean, required: true },
  });

  return mongoose.models.users || mongoose.model<IUser>("users", userSchema);
};
