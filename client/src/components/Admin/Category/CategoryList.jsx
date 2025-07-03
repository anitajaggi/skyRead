import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { useCategoryList } from "./useCategoryList";
import { Pagination } from "../../../utils/Pagination";

/**
 * Displays a paginated, editable, and deletable list of categories.
 * Uses a custom hook to manage logic and API interaction.
 */
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
    // bulk actions
    handleCheckboxChange,
    handleSelectAll,
    selectedCategories,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  } = useCategoryList();

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        {selectedCategories.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedCategories.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedCategories.length === categories.length &&
                    categories.length > 0
                  }
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id || index} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCheckboxChange(category._id)}
                  />
                </td>
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4">{category.category}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  {/* Edit button */}
                  <button
                    className="text-blue-600 border cursor-pointer border-blue-600 rounded-full p-1 hover:bg-blue-100"
                    onClick={() => onEdit(category)}
                  >
                    <FaRegEdit />
                  </button>

                  {/* Delete button */}
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

      {/* Pagination Controls */}
      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

      {/* Confirm Deletion Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
      {/* Bulk Delete Confirmation Dialog */}
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
