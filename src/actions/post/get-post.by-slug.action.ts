'use server'

import databaseConnector from '../../database';
import { Post } from '../../database/models';

export async function getPostBySlugAction(slug: string){
    await databaseConnector();
    const post =  await Post.findOne({'slug': slug});
    return {
        _id: post._id.toString(),
        title: post.title,
        slug: post.slug,
        description: post.description,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
    };
  }