"use server";

import databaseConnector from "@/database";
import { Category } from "@/database/models";
import { reponseParser } from "@/utils";
export async function getAllCategoriesAction() {
  await databaseConnector();
  const categories = await Category.find();
  return reponseParser.setJSONResponse(categories);
}
