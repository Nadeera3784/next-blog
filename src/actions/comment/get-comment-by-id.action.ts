"use server";

import databaseConnector from "@/database";
import { CommentModel } from "@/database/models";
import { reponseParser, stringToObjectId } from "@/utils";

export async function getCommentByIdAction(id: string) {
  await databaseConnector();
  const post = await CommentModel.findOne({ _id: stringToObjectId(id) });
  return reponseParser.setJSONResponse(post);
}
