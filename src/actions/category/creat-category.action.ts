"use server";

import databaseConnector from "@/database";
import { CategoryModel } from "@/database/models";
import { createCategorySchema } from "@/schemas";
import * as z from "zod";

export async function createCategoryAction(
  post: z.infer<typeof createCategorySchema>,
) {
  try {
    await databaseConnector();
    const data = await createCategorySchema.parseAsync(post);
    await CategoryModel.create(data);
    return { success: true, message: "Category has been added" };
  } catch (error) {
    return { success: false, message: error };
  }
}
