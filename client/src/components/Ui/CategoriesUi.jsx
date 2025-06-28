import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../features/categories/categoryThunks";

export const CategoriesUi = ({ setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!categories.length) return <p>No categories found.</p>;

  return (
    <div className="bg-red-100 py-1 border-b-2 border-red-600">
      <div className="flex overflow-x-auto scrollbar-hide justify-left md:justify-center gap-3 px-2">
        <div
          className="text-center md:font-bold text-sm hover:text-blue-500 cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </div>
        {categories.map((category, index) => (
          <div
            key={index}
            className="text-center md:font-bold text-sm hover:text-red-500 hover:underline cursor-pointer"
            onClick={() => setSelectedCategory(category.category)} // 🔥
          >
            {category.category}
          </div>
        ))}
      </div>
    </div>
  );
};
