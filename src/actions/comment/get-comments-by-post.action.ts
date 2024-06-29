"use server";

import databaseConnector from "@/database";
import { CommentModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getCommentsByPostAction(id: string) {
  await databaseConnector();
  const comments = await CommentModel.find({ post: id });
  return reponseParser.setJSONResponse(comments);
}
