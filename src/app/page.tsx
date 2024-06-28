'use client'

import { useState, useEffect } from 'react';
import Post from "@/components/Blog/Post";
import { getAllPostsAction} from '@/actions/post';
import { Post as BlogPost } from "@/interfaces";
import Pagination from "@/components/Pagination";
import { reponseParser } from '@/utils';
import Demo from '@/components/Demo';
import Categories from '@/components/Header/Categories';


export default function Home() {

  const [posts, setPost] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const fetchPosts= async (page: number) => {
    setIsLoading(true);
    try {
      const result = await getAllPostsAction(page);
      setPost(reponseParser.getJSONResponse(result.data));
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
       <Categories/>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* <Demo/> */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">            
            {posts.map((post) => (
              <Post
                key={post._id}
                {...post}
              />
            ))}
          </div>
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
