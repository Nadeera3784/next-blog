"use server";

import { faker } from "@faker-js/faker";
import databaseConnector from "@/database";
import { PostModel, CategoryModel } from "@/database/models";

export async function postSeedAction() {
  await databaseConnector();
  const category = await CategoryModel.aggregate().sample(1);
  await PostModel.create({
    title: faker.lorem.words(5),
    description: faker.lorem.paragraph(50),
    category: category[0]?._id,
  });
}
