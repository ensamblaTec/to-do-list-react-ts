import mongoose from "mongoose";

// Schema
export const userEntity = () => {
  let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
  });

  return mongoose.model('Users', userSchema)
};
