import { categorySchema } from "../schemas";
import mongoose from "mongoose";

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
