import Table from "@/components/admin/post/post-table";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <header>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>
      <div className="px-4 py-8 sm:px-0">
        <Table />
      </div>
    </div>
  );
};
export default Page;
