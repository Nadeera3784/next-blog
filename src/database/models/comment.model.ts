import { commentSchema } from "../schemas";
import mongoose from "mongoose";

export const CommentModel =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
