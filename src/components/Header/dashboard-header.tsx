"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-lg">
                Next Blog
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`${pathname === "/dashboard" ? "border-black text-gray-900" : "border-transparent text-gray-500"} hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
                aria-current="page"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/categories"
                className={`${pathname === "/dashboard/categories" ? "border-black text-gray-900" : "border-transparent text-gray-500"} hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
              >
                Categories
              </Link>
              <Link
                href="/dashboard/comments"
                className={`${pathname === "/dashboard/comments" ? "border-black text-gray-900" : "border-transparent text-gray-500"} hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
              >
                Comments
              </Link>
              <Link
                href="/dashboard/settings"
                className={`${pathname === "/dashboard/settings" ? "border-black text-gray-900" : "border-transparent text-gray-500"} hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
              >
                Settings
              </Link>
              <span
                onClick={() => signOut()}
                className={`hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer`}
              >
                Sign out
              </span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>{session?.user?.name}</div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/dashboard"
            className={`${pathname === "/dashboard" ? "bg-gray border-black text-black" : "border-transparent text-gray-500"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            aria-current="page"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/categories"
            className={`${pathname === "/dashboard/categories" ? "bg-gray border-black text-black" : "border-transparent text-gray-500"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Categories
          </Link>
          <Link
            href="/dashboard/comments"
            className={`${pathname === "/dashboard/comments" ? "bg-gray border-black text-black" : "border-transparent text-gray-500"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Comments
          </Link>
          <Link
            href="/dashboard/settings"
            className={`${pathname === "/dashboard/settings" ? "bg-gray border-black text-black" : "border-transparent text-gray-500"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Settings
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div>
              <div className="text-base font-medium text-gray-800">
                {session?.user?.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {session?.user?.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <span
              onClick={() => signOut()}
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Sign out
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
