"use server";

import databaseConnector from "@/database";
import { CategoryModel } from "@/database/models";

export async function categorySeedAction() {
  await databaseConnector();
  await CategoryModel.create([
    {
      name: "Business",
    },
    {
      name: "Music",
    },
    {
      name: "Lifestyle",
    },
    {
      name: "Fashion",
    },
    {
      name: "Finance",
    },
    {
      name: "Travel",
    },
    {
      name: "Sports",
    },
  ]);
}
