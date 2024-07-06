"use client";

import { useState, useEffect } from "react";
import { Post } from "@/components/blog";
import { getPostsWithPaginationAction } from "@/actions/post";
import { Post as BlogPost } from "@/interfaces";
import Pagination from "@/components/pagination";
import { reponseParser } from "@/utils";
import Categories from "@/components/header/Categories";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [posts, setPost] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const result = await getPostsWithPaginationAction(page);
      setPost(reponseParser.getJSONResponse(result.data));
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Header />
        <Categories />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <Post key={post._id} {...post} />
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
