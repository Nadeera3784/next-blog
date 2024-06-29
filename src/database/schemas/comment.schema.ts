import mongoose, { Schema } from "mongoose";

export const commentSchema: Schema = new Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
