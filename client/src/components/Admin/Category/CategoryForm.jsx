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
        <div className="p-4 bg-white rounded shadow">
          <div className="my-2">
            <input
              type="text"
              name="category"
              value={category.category}
              onChange={handleChange}
              placeholder="Category Name"
              className="border px-3 py-2 rounded w-full"
            />
            {fieldErrors?.category && (
              <p className="text-red-600 text-sm mt-1">
                {fieldErrors.category}
              </p>
            )}
          </div>
          <button
            className={`text-white px-4 py-2 rounded focus:bg-gray-500 cursor-pointer ${
              category.id ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {category.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    );
  }
);
