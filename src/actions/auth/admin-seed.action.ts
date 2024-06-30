"use server";

import databaseConnector from "@/database";
import { UserModel } from "@/database/models";

export async function adminSeedAction() {
  await databaseConnector();
  await UserModel.create({
    name: "John Doe",
    email: "admin@gmail.com",
    password: "password",
  });
}
