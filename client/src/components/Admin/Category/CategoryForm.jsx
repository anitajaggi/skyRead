import { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  updateCategory,
  getAllCategories,
} from "../../../features/categories/categoryThunks";
import { clearFieldError } from "../../../features/categories/categorySlice";

export const CategoryForm = forwardRef(
  ({ selectedCategory, clearSelection, setActiveTab, tabs }, ref) => {
    const [category, setCategory] = useState({ category: "" });
    const dispatch = useDispatch();
    const { fieldErrors } = useSelector((state) => state.category);

    useEffect(() => {
      if (selectedCategory) {
        setCategory({
          id: selectedCategory._id,
          category: selectedCategory.category,
        });
      }
    }, [selectedCategory]);

    const handleChange = (e) => {
      setCategory({ ...category, [e.target.name]: e.target.value });
      if (fieldErrors[e.target.name]) {
        dispatch(clearFieldError(e.target.name));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let res;

      if (category.id) {
        res = await dispatch(
          updateCategory({
            categoryId: category.id,
            category: { category: category.category },
          })
        );
        if (updateCategory.fulfilled.match(res)) {
          setActiveTab(Object.keys(tabs)[0]);
        }
      } else {
        res = await dispatch(createCategory({ category: category.category }));
      }

      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getAllCategories());
        setCategory({ category: "" });
        clearSelection();
      }
    };

    return (
      <form onSubmit={handleSubmit} ref={ref}>
        <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-indigo-700">
            {category.id ? "Edit Category" : "Add New Category"}
          </h3>

          <div>
            <input
              type="text"
              name="category"
              value={category.category}
              onChange={handleChange}
              placeholder="Enter category name"
              className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                fieldErrors?.category ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors?.category && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors.category}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 cursor-pointer ${
              category.id
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {category.id ? "Update Category" : "Create Category"}
          </button>
        </div>
      </form>
    );
  }
);
