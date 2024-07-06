import ChangePasswordForm from "@/components/admin/settings/change-password-form";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <header>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Settings
              </h1>
            </div>
          </div>
        </div>
      </header>
      <div className="px-4 py-8 sm:px-0">
        <ChangePasswordForm />
      </div>
    </div>
  );
};
export default Page;
