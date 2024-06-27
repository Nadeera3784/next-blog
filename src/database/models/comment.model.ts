import { commentSchema } from '../schemas';
import mongoose from "mongoose";

export const Comment  = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
