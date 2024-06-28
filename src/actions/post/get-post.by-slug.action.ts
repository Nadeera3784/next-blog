'use server'

import databaseConnector from '@/database';
import { Post } from '@/database/models';
import { reponseParser } from '@/utils';

export async function getPostBySlugAction(slug: string){
    await databaseConnector();
    const post =  await Post.findOne({'slug': slug}).populate('category');
    return reponseParser.setJSONResponse(post);
  }