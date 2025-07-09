import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../features/categories/categoryThunks";

export const CategoriesUi = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-2 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-4 mb-12 text-indigo-600 text-base font-semibold tracking-tight">
        {/* All Category */}
        <div
          onClick={() => setSelectedCategory(null)}
          className={`cursor-pointer relative group transition-all duration-300 ${
            selectedCategory === null
              ? "text-indigo-900"
              : "hover:text-indigo-900"
          }`}
        >
          All
          <span
            className={`block h-[2px] bg-indigo-700 transition-all duration-300 absolute bottom-[-4px] left-0 group-hover:w-full ${
              selectedCategory === null ? "w-full" : "w-0"
            }`}
          ></span>
        </div>

        {/* Individual Categories */}
        {categories.map((category, idx) => {
          const isActive = selectedCategory === category.category;

          return (
            <div
              key={idx}
              onClick={() => setSelectedCategory(category.category)}
              className={`cursor-pointer relative group transition-all duration-300 ${
                isActive ? "text-indigo-900" : "hover:text-indigo-900"
              }`}
            >
              {category.category}
              <span
                className={`block h-[2px] bg-indigo-700 transition-all duration-300 absolute bottom-[-4px] left-0 group-hover:w-full ${
                  isActive ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
