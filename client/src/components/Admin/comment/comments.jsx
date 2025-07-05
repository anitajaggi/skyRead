import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { Pagination } from "../../../utils/Pagination";
import { useCommentsLogic } from "./useCommentsLogic";

export const Comments = () => {
  const {
    allComments,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    setPage,
    selectedComments,
    isConfirmOpen,
    isMultiConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleBulkDeleteConfirm,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
  } = useCommentsLogic();

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
        {selectedComments.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedComments.length})
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
                    selectedComments.length === allComments.length &&
                    allComments.length > 0
                  }
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Post</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment, index) => (
              <tr key={comment._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedComments.includes(comment._id)}
                    onChange={() => handleCheckboxChange(comment._id)}
                  />
                </td>
                <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4">{comment.user.username}</td>
                <td className="px-6 py-4">{comment.post}</td>
                <td className="px-6 py-4">{comment.message}</td>
                <td className="px-6 py-4">
                  {new Date(comment.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(comment._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Comments"
        description={`Are you sure you want to delete ${selectedComments.length} comments? This action cannot be undone.`}
      />
    </div>
  );
};
