import { Metadata } from "next";
import { SignInForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description: "sign in to your dashboard",
};

const Page = () => {
  return (
    <div className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">
      <main className="flex flex-auto flex-col max-w-full">
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
          <div className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16" />
          <div className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16" />
          <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                <span>Next Blog</span>
              </h1>
              <p className="text-gray-500">
                Welcome, please sign in to your dashboard
              </p>
            </div>
            <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
              <div className="p-5 lg:p-6 grow w-full">
                <div className="sm:p-5 lg:px-10 lg:py-8">
                  <SignInForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Page;
