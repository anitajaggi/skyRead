import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../../features/categories/categoryThunks";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";

export const CategoryList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    const res = await dispatch(deleteCategory(categoryToDelete));
    if (deleteCategory.fulfilled.match(res)) {
      await dispatch(getAllCategories());
    }
    setIsConfirmOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{category.category}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-blue-600 border cursor-pointer border-blue-600 rounded-full p-1 hover:bg-blue-100"
                    onClick={() => onEdit(category)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(category._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
};
