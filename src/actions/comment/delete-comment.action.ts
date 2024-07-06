"use server";

import databaseConnector from "@/database";
import { CommentModel } from "@/database/models";
import { stringToObjectId } from "@/utils";

export async function deleteCommentAction(id: string) {
  try {
    await databaseConnector();
    await CommentModel.deleteOne({ _id: stringToObjectId(id) });
    return { sucess: true, message: "Comment has been deleted" };
  } catch (error) {
    return { sucess: false, message: error };
  }
}
