import * as z from "zod";

export const commentSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("This is not a valid email."),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  comment: z
    .string()
    .min(1, {
      message: "Comment is required",
    })
    .max(100),
});

export const createCommentSchema = z.object({
  post: z.string().min(1, {
    message: "Post id is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("This is not a valid email."),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  comment: z
    .string()
    .min(1, {
      message: "Comment is required",
    })
    .max(100),
});

export const updateCommentSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("This is not a valid email."),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  comment: z
    .string()
    .min(1, {
      message: "Comment is required",
    })
    .max(100),
});
