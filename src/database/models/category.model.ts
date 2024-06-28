import { categorySchema } from '../schemas';
import mongoose from "mongoose";

export const Category  = mongoose.models.Category || mongoose.model('Category', categorySchema);
