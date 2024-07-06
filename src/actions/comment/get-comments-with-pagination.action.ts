"use server";

import databaseConnector from "@/database";
import { CommentModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getCommentsWithPaginationAction(
  page: number = 1,
  limit: number = 10,
  search: string = "",
) {
  await databaseConnector();

  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = { name: { $regex: search, $options: "i" } };
  }

  const comments = await CommentModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("post")
    .lean();

  const totalCount = await CommentModel.countDocuments(query);

  return {
    data: reponseParser.setJSONResponse(comments),
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalCount,
  };
}
