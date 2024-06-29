"use server";

import databaseConnector from "@/database";
import { CategoryModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getAllCategoriesAction() {
  await databaseConnector();
  const categories = await CategoryModel.find();
  return reponseParser.setJSONResponse(categories);
}
