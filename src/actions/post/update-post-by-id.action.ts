"use server";

import * as z from "zod";
import databaseConnector from "@/database";
import { PostModel } from "@/database/models";
import { createPostSchema } from "@/schemas";
import { stringToObjectId } from "@/utils";

export async function updatePostByIdaction(
  id: string,
  post: z.infer<typeof createPostSchema>,
) {
  try {
    await databaseConnector();
    const data = await createPostSchema.parseAsync(post);
    await PostModel.findByIdAndUpdate(stringToObjectId(id), data);
    return { success: true, message: "Post has been updated" };
  } catch (error) {
    return { success: false, message: error };
  }
}
