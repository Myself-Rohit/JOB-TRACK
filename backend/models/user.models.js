import { MinKey } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileName: {
      type: String,
    },
    profileEmail: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    role: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
