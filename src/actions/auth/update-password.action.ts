"use server";

import databaseConnector from "@/database";
import { UserModel } from "@/database/models";
import bcrypt from "bcryptjs";

export async function updatePasswordAction(email: string, password: string) {
  try {
    await databaseConnector();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await UserModel.findOneAndUpdate({ email: email }, { password: hash });
    return { success: true, message: "Password has been updated" };
  } catch (error) {
    return { success: false, message: error };
  }
}
