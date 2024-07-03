"use server";

import databaseConnector from "@/database";
import { PostModel, CommentModel } from "@/database/models";

export async function deletePostAction(id: string) {
  try {
    await databaseConnector();
    await PostModel.deleteOne({ _id: id });
    await CommentModel.deleteMany({ post: id });
    return { sucess: true, message: "Post has been deleted" };
  } catch (error) {
    return { sucess: false, message: error };
  }
}
