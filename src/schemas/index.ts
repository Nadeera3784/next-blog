import * as z from 'zod';

export const commentSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: 'Email is required',
        })
        .email('This is not a valid email.'),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    comment: z.string().min(1, {
        message: 'Comment is required',
    }).max(100),
});