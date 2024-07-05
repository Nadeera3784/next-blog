"use server";

import databaseConnector from "@/database";
import { CategoryModel } from "@/database/models";
import { reponseParser, stringToObjectId } from "@/utils";

export async function getCategoryByIdAction(id: string) {
  await databaseConnector();
  const post = await CategoryModel.findOne({ _id: stringToObjectId(id) });
  return reponseParser.setJSONResponse(post);
}
