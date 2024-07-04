"use server";

import databaseConnector from "@/database";
import { PostModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getPostBySlugAction(slug: string) {
  await databaseConnector();
  const post = await PostModel.findOne({ slug: slug }).populate("category");
  return reponseParser.setJSONResponse(post);
}
