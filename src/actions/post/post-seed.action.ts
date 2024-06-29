"use server";

import { faker } from "@faker-js/faker";
import databaseConnector from "@/database";
import { Post, Category } from "@/database/models";

export async function postSeedAction() {
  await databaseConnector();
  const category = await Category.aggregate().sample(1);
  await Post.create({
    title: faker.lorem.words(5),
    description: faker.lorem.paragraph(50),
    category: category[0]?._id,
  });
}
