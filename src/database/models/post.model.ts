import { postSchema } from '../schemas';
import mongoose from "mongoose";

export const Post  = mongoose.models.Post || mongoose.model('Post', postSchema);
