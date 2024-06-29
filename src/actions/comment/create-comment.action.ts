"use server";

import databaseConnector from "@/database";
import { Comment } from "@/database/models";
import { createCommentDto } from "@/dtos/comment";
import { createCommentSchema } from "@/schemas";

export async function createCommentAction(dto: createCommentDto) {
  await databaseConnector();
  try {
    const data = await createCommentSchema.parseAsync(dto);
    await Comment.create(data);
    return { sucess: true, message: "Comment has been added" };
  } catch (error) {
    return { sucess: false, message: error };
  }
}
