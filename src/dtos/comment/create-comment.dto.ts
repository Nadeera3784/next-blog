import { z } from 'zod';
import { createCommentSchema } from '@/schemas';

export type createCommentDto = z.infer<typeof createCommentSchema>;