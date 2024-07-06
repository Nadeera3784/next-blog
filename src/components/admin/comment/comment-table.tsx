"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import {
  getCommentsWithPaginationAction,
  deleteCommentAction,
} from "@/actions/comment";
import { Comment } from "@/interfaces";
import Pagination from "@/components/pagination";
import { reponseParser, truncate } from "@/utils";

export default function CommentTable() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(0);

  const fetchComments = async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const result = await getCommentsWithPaginationAction(page, 10, search);
      setComments(reponseParser.getJSONResponse(result.data));
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(currentPage, searchTerm);
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
      const result = await deleteCommentAction(id);
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-medium text-xs text-muted"
                >
                  Post
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
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="bg-white border-b  hover:bg-gray-50"
                >
                  <th scope="row" className="px-6 py-4">
                    {comment.name}
                  </th>
                  <th scope="row" className="px-6 py-4">
                    {comment.email}
                  </th>
                  <th scope="row" className="px-6 py-4">
                    {truncate(comment.post?.title, 25)}
                  </th>
                  <td className="px-6 py-4">
                    {dayjs(comment?.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => onClickDelete(comment._id)}
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
                      href={`/dashboard/comments/${comment._id}`}
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
