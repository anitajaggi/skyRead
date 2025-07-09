import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { useMessagesLogic } from "./useMessagesLogic";
import { Pagination } from "../../../utils/Pagination";

export const Messages = () => {
  const {
    contacts,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedMessages,
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
  } = useMessagesLogic();

  const limit = 10;

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Messages</h2>
        {selectedMessages.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedMessages.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-50 text-xs uppercase text-indigo-600 border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedMessages.length === contacts.length &&
                    contacts.length > 0
                  }
                  className="accent-indigo-600"
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((msg, index) => (
              <tr key={msg._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(msg._id)}
                    onChange={() => handleCheckboxChange(msg._id)}
                    className="accent-indigo-600"
                  />
                </td>
                <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4">{msg.username}</td>
                <td className="px-6 py-4">{msg.email}</td>
                <td className="px-6 py-4">{msg.message}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(msg._id)}
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

      {/* Confirmation dialogs */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Messages"
        description={`Are you sure you want to delete ${selectedMessages.length} messages? This action cannot be undone.`}
      />
    </div>
  );
};
