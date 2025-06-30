import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../features/categories/categoryThunks";

export const CategoriesUi = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // if (loading) return <p>Loading categories...</p>;
  // if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  // if (!categories.length) return <p>No categories found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-1">
      <div className="flex flex-wrap gap-2 mb-8">
        <div
          className={`text-center md:font-bold text-sm cursor-pointer px-3 py-1 rounded 
            ${
              selectedCategory === null ? "bg-gray-200 " : "hover:text-blue-500"
            }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </div>

        {categories.map((category, index) => {
          const isActive = selectedCategory === category.category;
          return (
            <div
              key={index}
              className={`text-center md:font-bold text-sm cursor-pointer px-3 py-1 rounded 
                ${
                  isActive
                    ? "bg-red-100 text-red-500"
                    : "hover:text-red-500 hover:underline"
                }`}
              onClick={() => setSelectedCategory(category.category)}
            >
              {category.category}
            </div>
          );
        })}
      </div>
    </div>
  );
};
