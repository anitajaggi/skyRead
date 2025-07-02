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
  const { categories, currentPage, totalPages, loading } = useSelector(
    (state) => state.category
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getAllCategories({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    const res = await dispatch(deleteCategory(categoryToDelete));
    if (deleteCategory.fulfilled.match(res)) {
      await dispatch(getAllCategories({ page, limit }));
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
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>
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
      <div className="flex justify-end items-center p-4">
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-3 py-1 mr-2 rounded-full ${
            page === 1 || loading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Prev
        </button>
        <span className="mx-2 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={page === totalPages || loading}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-3 py-1 ml-2 rounded-full ${
            page === totalPages || loading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Next
        </button>
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
