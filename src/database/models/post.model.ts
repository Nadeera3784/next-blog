import { postSchema } from "../schemas";
import mongoose from "mongoose";

export const PostModel =
  mongoose.models.Post || mongoose.model("Post", postSchema);
