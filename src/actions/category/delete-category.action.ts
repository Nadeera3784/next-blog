"use server";

import databaseConnector from "@/database";
import { PostModel, CategoryModel } from "@/database/models";
import { stringToObjectId } from "@/utils";

export async function deleteCategoryAction(id: string) {
  try {
    await databaseConnector();
    await CategoryModel.deleteOne({ _id: stringToObjectId(id) });
    await PostModel.deleteMany({ category: stringToObjectId(id) });
    return { sucess: true, message: "Category has been deleted" };
  } catch (error) {
    return { sucess: false, message: error };
  }
}
