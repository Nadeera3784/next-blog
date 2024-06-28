'use server'

import databaseConnector from '@/database';
import { Comment } from '@/database/models';
import { reponseParser } from '@/utils';

export async function getCommentsByPostAction(id: string) {
    await databaseConnector();
    const comments = await Comment.find({ post: id });
    return reponseParser.setJSONResponse(comments);
}