"use server";

import databaseConnector from "@/database";
import { CategoryModel } from "@/database/models";
import { reponseParser } from "@/utils";

export async function getCategoriesWithPaginationAction(
  page: number = 1,
  limit: number = 9,
  search: string = "",
) {
  await databaseConnector();

  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = { name: { $regex: search, $options: "i" } };
  }

  const categories = await CategoryModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await CategoryModel.countDocuments(query);

  return {
    data: reponseParser.setJSONResponse(categories),
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalCount,
  };
}
