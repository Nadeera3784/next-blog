"use server";

import databaseConnector from "@/database";
import { PostModel } from "@/database/models";
import { createPostSchema } from "@/schemas/post.schema";
import * as z from "zod";

export async function createPostAction(post: z.infer<typeof createPostSchema>) {
  try {
    await databaseConnector();
    const data = await createPostSchema.parseAsync(post);
    await PostModel.create(data);
    return { success: true, message: "Post has been added" };
  } catch (error) {
    return { success: false, message: error };
  }
}
