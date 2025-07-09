import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { EditUserDialog } from "../../headlessui/EditUser";
import { useAllUsersLogic } from "./useAllUsersLogic";
import { Pagination } from "../../../utils/Pagination";

export const AllUsers = () => {
  const {
    user,
    users,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedUsers,
    isLastAdmin,
    isConfirmOpen,
    isEditOpen,
    isMultiConfirmOpen,
    userToEdit,
    handleEditClick,
    handleUserSave,
    handleDeleteClick,
    handleDeleteToConfirm,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleBulkDeleteConfirm,
    setIsEditOpen,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
  } = useAllUsersLogic();

  const limit = 10;

  // Only admins can access this page
  if (!user || !user.isAdmin) {
    return <p>Access denied. Only admins can view users.</p>;
  }

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Users</h2>
        {selectedUsers.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
          >
            Delete Selected ({selectedUsers.length})
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
                    selectedUsers.length ===
                      users.filter((u) => !u.isAdmin).length &&
                    users.filter((u) => !u.isAdmin).length > 0
                  }
                  className="accent-indigo-600"
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, index) => (
              <tr key={usr._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(usr._id)}
                    disabled={usr.isAdmin}
                    onChange={() => handleCheckboxChange(usr._id, usr.isAdmin)}
                    title={usr.isAdmin ? "Admins cannot be selected" : ""}
                    className="accent-indigo-600"
                  />
                </td>
                <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4">{usr.username}</td>
                <td className="px-6 py-4">{usr.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`py-1 px-3 rounded-full ${
                      usr.isAdmin ? "bg-green-300 uppercase" : ""
                    }`}
                  >
                    {usr.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-blue-600 border border-blue-600 cursor-pointer rounded-full p-1 hover:bg-blue-100"
                    onClick={() => handleEditClick(usr)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 border border-red-600 rounded-full cursor-pointer p-1 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={usr.isAdmin && isLastAdmin}
                    title={
                      usr.isAdmin && isLastAdmin
                        ? "You can't delete the last admin"
                        : "Delete user"
                    }
                    onClick={() => handleDeleteClick(usr._id)}
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
        onConfirm={handleDeleteToConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Users"
        description={`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`}
      />
      <EditUserDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={userToEdit}
        onSave={handleUserSave}
        isLastAdmin={isLastAdmin}
      />
    </div>
  );
};
