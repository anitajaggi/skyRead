import { useState, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
  getAllCategories,
} from "../../../features/categories/categoryThunks";

export const CategoryForm = forwardRef(
  ({ selectedCategory, clearSelection }, ref) => {
    const [category, setCategory] = useState({ category: "" });
    const dispatch = useDispatch();

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
          <input
            type="text"
            name="category"
            value={category.category}
            onChange={handleChange}
            placeholder="Category Name"
            required
            className="border px-3 py-2 rounded w-full my-2"
          />
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
