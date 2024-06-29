import mongoose, { Schema } from "mongoose";
import { slugify } from "@/utils/text";

export const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
).index({ title: 1 });

postSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});
