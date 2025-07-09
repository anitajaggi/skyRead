import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { useCategoryList } from "./useCategoryList";
import { Pagination } from "../../../utils/Pagination";

export const CategoryList = ({ onEdit }) => {
  const {
    categories,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    isConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    setIsConfirmOpen,
    setPage,
    handleCheckboxChange,
    handleSelectAll,
    selectedCategories,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  } = useCategoryList();

  return (
    <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Categories</h2>
        {selectedCategories.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-700 transition"
          >
            Delete Selected ({selectedCategories.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-50 text-xs uppercase text-indigo-600 border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3 w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedCategories.length === categories.length &&
                    categories.length > 0
                  }
                  className="accent-indigo-600"
                />
              </th>
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category._id || index}
                className="border-b hover:bg-indigo-50/30 transition"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCheckboxChange(category._id)}
                    className="accent-indigo-600"
                  />
                </td>
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4 capitalize font-medium">
                  {category.category}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-indigo-600 border border-indigo-500 rounded-full p-1 hover:bg-indigo-100 transition cursor-pointer"
                    onClick={() => onEdit(category)}
                    title="Edit"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 border border-red-500 rounded-full p-1 hover:bg-red-100 transition cursor-pointer"
                    onClick={() => handleDeleteClick(category._id)}
                    title="Delete"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />

      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Categories"
        description={`Are you sure you want to delete ${selectedCategories.length} categories? This action cannot be undone.`}
      />
    </div>
  );
};
