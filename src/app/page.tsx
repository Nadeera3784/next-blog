'use client'

import { useState, useEffect } from 'react';
import Post from "@/components/Blog/Post";
import { getAllPostsAction, postSeedAction} from '@/actions/post';
import { Blog } from "@/interfaces";
import Pagination from "@/components/Pagination";

export default function Home() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const fetchBlogs = async (page: number) => {
    setIsLoading(true);
    try {
      const result = await getAllPostsAction(page);
      setBlogs(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  const onClickGenerate = async () => {
    await postSeedAction();
  }


  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
            <button type='button' onClick={() => onClickGenerate() }>Seed</button>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">            
            {blogs.map((blog) => (
              <Post
                key={blog._id}
                {...blog}
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
