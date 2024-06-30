"use server";

import databaseConnector from "@/database";
import { UserModel } from "@/database/models";

export async function getUserByEmailAction(email: string) {
  await databaseConnector();
  return await UserModel.findOne({ email: email });
}
