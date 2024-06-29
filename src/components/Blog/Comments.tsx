import Link from "next/link";
import dayjs from "dayjs";
import { truncate } from "@/utils/text";
import { Comment as CommentInterface } from "@/interfaces";

interface CommentsProps {
  comments: CommentInterface[];
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="container">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3"
        >
          <div className="flex flex-row md-10">
            <div className="flex-col mt-1">
              <div className="flex items-center flex-1 px-2 font-bold leading-tight">
                {comment.name}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  {dayjs(comment.createdAt).format("YYYY-MM-DD")}
                </span>
              </div>
              <div className="flex-1 px-2 text-sm font-medium leading-loose text-gray-600">
                {comment.comment}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
