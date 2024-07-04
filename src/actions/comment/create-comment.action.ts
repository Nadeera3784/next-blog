"use server";

import * as z from "zod";
import databaseConnector from "@/database";
import { CommentModel } from "@/database/models";
import { createCommentSchema } from "@/schemas";

export async function createCommentAction(
  comment: z.infer<typeof createCommentSchema>,
) {
  await databaseConnector();
  try {
    const data = await createCommentSchema.parseAsync(comment);
    await CommentModel.create(data);
    return { success: true, message: "Comment has been added" };
  } catch (error) {
    return { success: false, message: error };
  }
}
