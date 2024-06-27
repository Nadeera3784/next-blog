'use server'

import databaseConnector from '../../database';
import { Post } from '../../database/models';

export async function getAllPostsAction(page: number = 1, limit: number = 10) {
    await databaseConnector();
    
    const skip = (page - 1) * limit;
    
    const blogs = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const totalBlogs = await Post.countDocuments();
    

    const serializedData = blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString()
    }));

    console.log('server action', serializedData);
    
    return {
      data: serializedData,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      totalBlogs
    };
  }