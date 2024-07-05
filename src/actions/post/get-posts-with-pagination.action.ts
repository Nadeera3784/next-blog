"use server";

import databaseConnector from "@/database";
import { PostModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getPostsWithPaginationAction(
  page: number = 1,
  limit: number = 9,
  search: string = "",
) {
  await databaseConnector();

  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }

  const posts = await PostModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("category")
    .lean();

  const totalCount = await PostModel.countDocuments(query);

  return {
    data: reponseParser.setJSONResponse(posts),
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalCount,
  };
}
