import { userSchema } from "../schemas";
import mongoose from "mongoose";

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
