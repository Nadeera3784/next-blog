'use server'

import databaseConnector from '../../database';
import { Comment } from '../../database/models';

export async function createCommentAction(data: object) {
    await databaseConnector();
    try {
        Comment.create(data);
        return { 'sucess': true, 'message': 'Comment has been added' };
    } catch (error) {
        return { 'sucess': false, 'message' : error };
    }
}