"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import EditFrom from "@/components/admin/comment/edit-comment-form";

const Page = () => {
  const urlParams = useParams();

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <header>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Edit Comment
              </h1>
            </div>
            <div>
              <Link
                href={`/dashboard/comments`}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-left mr-3"
                >
                  <path d="M6 8L2 12L6 16" />
                  <path d="M2 12H22" />
                </svg>
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>
      {urlParams?.id && <EditFrom id={urlParams?.id} />}
    </div>
  );
};
export default Page;
