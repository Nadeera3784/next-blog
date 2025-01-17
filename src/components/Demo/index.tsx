import { postSeedAction } from "@/actions/post";
import { categorySeedAction } from "@/actions/category";
import { adminSeedAction } from "@/actions/auth";

export default function Demo() {
  const onClickPostGenerate = async () => {
    await postSeedAction();
    window.location.reload();
  };

  const onClickCategoryGenerate = async () => {
    await categorySeedAction();
    window.location.reload();
  };

  const onClickCreateAdmin = async () => {
    await adminSeedAction();
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <button
        type="button"
        onClick={() => onClickCategoryGenerate()}
        className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
      >
        <span>(1)Create Category</span>
      </button>
      <button
        type="button"
        onClick={() => onClickPostGenerate()}
        className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
      >
        <span>(2)Generate Posts</span>
      </button>

      <button
        type="button"
        onClick={() => onClickCreateAdmin()}
        className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
      >
        <span>(3)Create Admin</span>
      </button>
    </div>
  );
}
