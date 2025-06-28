import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "../../../features/Auth/authThunk";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ConfirmDialog } from "../../headlessui/ConfirmDialog";
import { EditUserDialog } from "../../headlessui/EditUser";

export const AllUsers = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getAllUsers());
    }
  }, [dispatch, user]);

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditOpen(true);
  };

  const handleUserSave = async (id, data) => {
    if (!id || !data) return;
    const res = await dispatch(updateUserById({ id, data }));
    setIsEditOpen(false);
    setUserToEdit(null);
    dispatch(getAllUsers());
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteToConfirm = async () => {
    if (!userToDelete) return;
    const res = await dispatch(deleteUserById({ id: userToDelete }));
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  if (!user || !user.isAdmin)
    return <p>Access denied. Only admins can view users.</p>;
  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                username
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, index) => (
              <tr key={usr._id} className="border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{usr.username}</td>
                <td className="px-6 py-4">{usr.email}</td>
                <td
                  className={`px-6 py-4 ${usr.isAdmin ? "bg-green-300" : ""}`}
                >
                  {usr.isAdmin ? "Admin" : "User"}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-blue-600 cursor-pointer border border-blue-600 rounded-full p-1 hover:bg-blue-100"
                    onClick={() => handleEditClick(usr)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 cursor-pointer border border-red-600 rounded-full p-1 hover:bg-red-100"
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

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteToConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />

      <EditUserDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={userToEdit}
        onSave={handleUserSave}
      />
    </div>
  );
};
