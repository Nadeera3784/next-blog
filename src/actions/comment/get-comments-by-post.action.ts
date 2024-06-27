'use server'

import databaseConnector from '../../database';
import { Comment } from '../../database/models';

export async function getCommentsByPostAction(id: string) {
    await databaseConnector();

    const comments = await Comment.find({ post: id }).lean();

    const serializedData = comments.map(comment => ({
        ...comment,
        _id: comment._id.toString(),
        post: comment.post.toString(),
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString()
    }));

    return serializedData;
}