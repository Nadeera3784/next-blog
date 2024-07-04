"use server";

import databaseConnector from "@/database";
import { PostModel } from "@/database/models";
import { reponseParser, stringToObjectId } from "@/utils";

export async function getPostByIdAction(id: string) {
  await databaseConnector();
  const post = await PostModel.findOne({ _id: stringToObjectId(id) });
  return reponseParser.setJSONResponse(post);
}
