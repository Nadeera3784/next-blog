"use server";

import databaseConnector from "@/database";
import { PostModel } from "@/database/models";

export async function updatePostViewAction(postId: string) {
  await databaseConnector();
  await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { views: 1 } },
  ).exec();
}
