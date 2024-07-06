"use server";

import * as z from "zod";
import databaseConnector from "@/database";
import { CommentModel } from "@/database/models";
import { updateCommentSchema } from "@/schemas";
import { stringToObjectId } from "@/utils";

export async function updateCommentByIdaction(
  id: string,
  comment: z.infer<typeof updateCommentSchema>,
) {
  try {
    await databaseConnector();
    const data = await updateCommentSchema.parseAsync(comment);
    await CommentModel.findByIdAndUpdate(stringToObjectId(id), data);
    return { success: true, message: "Comment has been updated" };
  } catch (error) {
    return { success: false, message: error };
  }
}
