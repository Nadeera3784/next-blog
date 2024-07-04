import * as z from "zod";

export const createPostSchema = z.object({
  category: z.string().min(1, {
    message: "Category is required",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});
