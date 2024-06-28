import { getAllCategoriesAction } from '@/actions/category';
import { reponseParser } from '@/utils';
import { useEffect, useState } from 'react';

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  const fetchCategories = async () => {
    const result = await getAllCategoriesAction();
    setCategories(reponseParser.getJSONResponse(result));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSelectCategory = (id: string) => {
    setSelectCategory(id);
  }

  return (
    <div className="flex items-start justify-start sm:items-stretch sm:justify-start mt-4">
      <div className="">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <span
              key={category?._id}
              className={`${category?._id === selectCategory ? 'bg-black text-white' : ' ' } rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white cursor-pointer`}
              onClick={() => onSelectCategory(category?._id)}
            >
              {category?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
