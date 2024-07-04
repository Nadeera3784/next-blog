"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { getAllPostsAction, deletePostAction } from "@/actions/post";
import { Post as BlogPost } from "@/interfaces";
import Pagination from "@/components/pagination";
import { reponseParser } from "@/utils";

export default function PostTable() {
  const [posts, setPost] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(0);

  const fetchPosts = async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const result = await getAllPostsAction(page, 9, search);
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
    fetchPosts(currentPage, searchTerm);
  }, [currentPage, searchTerm, refresh]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const onClickDelete = async (id: string) => {
    if (confirm("Are you sure want to delete this?") == true) {
      const result = await deletePostAction(id);
      if (result.sucess) {
        setRefresh(refresh + 1);
      }
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="flex items-center py-3">
        <input
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="search..."
        />
        <Link
          href="/dashboard/post/create"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
        >
          <svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
          >
            <path
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          New
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="border-b">
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Views
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="bg-white border-b  hover:bg-gray-50"
                >
                  <th scope="row" className="px-6 py-4">
                    {post.title}
                  </th>
                  <td className="px-6 py-4">{post?.views}</td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                      {post?.category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {dayjs(post.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => onClickDelete(post._id)}
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 rounded-[6px] [&_svg]:size-3.5"
                    >
                      <span className="sr-only">Delete</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash2 h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1={10} x2={10} y1={11} y2={17} />
                        <line x1={14} x2={14} y1={11} y2={17} />
                      </svg>
                    </button>

                    <Link
                      href={`/dashboard/post/${post._id}`}
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 rounded-[6px] [&_svg]:size-3.5"
                    >
                      <span className="sr-only">Edit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-file-pen-line"
                      >
                        <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                        <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                        <path d="M8 18h1" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="py-5">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
