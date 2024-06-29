"use server";

import databaseConnector from "@/database";
import { PostModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getAllPostsAction(page: number = 1, limit: number = 9) {
  await databaseConnector();

  const skip = (page - 1) * limit;

  const posts = await PostModel.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("category")
    .lean();

  const totalBlogs = await PostModel.countDocuments();

  return {
    data: reponseParser.setJSONResponse(posts),
    currentPage: page,
    totalPages: Math.ceil(totalBlogs / limit),
    totalBlogs,
  };
}
