"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import { getPostBySlugAction, updatePostViewAction } from "@/actions/post";
import { getCommentsByPostAction } from "@/actions/comment";
import { Post, Comment } from "@/interfaces";
import { reponseParser } from "@/utils";
import { Comments, CommentForm } from "@/components/Blog";

export default function BlogDetails() {
  const urlParams = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const getPost = async (slug: string) => {
    setIsLoading(true);
    try {
      const data = await getPostBySlugAction(slug);
      setPost(reponseParser.getJSONResponse(data));
      setRefresh(1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getComments = async () => {
    setIsLoading(true);
    try {
      if (post?._id) {
        const data = await getCommentsByPostAction(post?._id);
        setComments(reponseParser.getJSONResponse(data));
        await updatePostViewAction(post?._id);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPost(urlParams?.slug);
  }, []);

  useEffect(() => {
    getComments();
  }, [refresh]);

  const handleCommentSubmitted = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="mx-auto">
      <hr />
      <div className="mx-auto mt-14">
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
          {post?.title}
        </h1>
        <div className="flex gap-2 mt-3 items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex gap-2 items-center">
            <span>{post?.category?.name}</span>
            <span className="text-gray-400">•</span>
            {dayjs(post?.createdAt).format("YYYY-MM-DD")}
          </div>
          <div>
            <Link
              href="/"
              className="bg-gray-100 px-5 py-3 rounded-md hover:bg-gray-200 transition"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto prose prose-lg mt-6">{post?.description}</div>
      <h3 className="flex items-center my-8">
        <span aria-hidden="true" className="grow bg-gray-200 rounded h-0.5" />
        <span className="text-lg font-medium mx-3">Comments</span>
        <span aria-hidden="true" className="grow bg-gray-200 rounded h-0.5" />
      </h3>
      <section>
        {post?._id && (
          <CommentForm
            postId={post._id}
            onCommentSubmitted={handleCommentSubmitted}
          />
        )}

        <Comments comments={comments} />
      </section>
    </div>
  );
}
