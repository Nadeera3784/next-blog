"use server";

import * as z from "zod";
import databaseConnector from "@/database";
import { CategoryModel } from "@/database/models";
import { createCategorySchema as updateCategorySchema } from "@/schemas";
import { stringToObjectId } from "@/utils";

export async function updateCategoryByIdaction(
  id: string,
  post: z.infer<typeof updateCategorySchema>,
) {
  try {
    await databaseConnector();
    const data = await updateCategorySchema.parseAsync(post);
    await CategoryModel.findByIdAndUpdate(stringToObjectId(id), data);
    return { success: true, message: "Category has been updated" };
  } catch (error) {
    return { success: false, message: error };
  }
}
