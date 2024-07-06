"use server";

import databaseConnector from "@/database";
import { PostModel, CategoryModel, CommentModel } from "@/database/models";
import { stringToObjectId } from "@/utils";

export async function deleteCategoryAction(id: string) {
  try {
    await databaseConnector();
    await CategoryModel.deleteOne({ _id: stringToObjectId(id) });
    const posts = await PostModel.find({ category: stringToObjectId(id) });
    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        await CommentModel.deleteOne({ post: posts[index]._id });
      }
    }
    await PostModel.deleteMany({ category: stringToObjectId(id) });
    return { sucess: true, message: "Category has been deleted" };
  } catch (error) {
    return { sucess: false, message: error };
  }
}
