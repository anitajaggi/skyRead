import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultipleUsers,
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "../../../features/Auth/authThunk";

// Custom hook for managing logic and state for the AllUsers component
export const useAllUsersLogic = () => {
  const dispatch = useDispatch();

  // Redux selectors
  const { user } = useSelector((state) => state.auth);
  const { users, currentPage, totalPages, loading } = useSelector(
    (state) => state.users
  );

  // Local state
  const [page, setPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  // Dialog visibility flags
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const limit = 10; // Number of users per page

  // Helper: fetch users for a specific page
  const refreshUserList = (pageToFetch) => {
    dispatch(getAllUsers({ page: pageToFetch, limit }));
  };

  // Determine if there's only one admin left
  const totalAdmins = users.filter((u) => u.isAdmin).length;
  const isLastAdmin = totalAdmins === 1 && user?.isAdmin;

  // Fetch users when page loads or page changes
  useEffect(() => {
    if (user?.isAdmin) {
      refreshUserList(page);
    }
  }, [dispatch, user, page, limit]);

  // Edit handlers
  const handleEditClick = (usr) => {
    const isLast = totalAdmins === 1 && usr.isAdmin;
    setUserToEdit({ ...usr, isLastAdmin: isLast });
    setIsEditOpen(true);
  };

  const handleUserSave = async (id, data) => {
    if (!id || !data) return;
    await dispatch(updateUserById({ id, data }));
    setIsEditOpen(false);
    setUserToEdit(null);
    refreshUserList(page);
  };

  // Delete single user
  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteToConfirm = async () => {
    if (!userToDelete) return;
    await dispatch(deleteUserById({ id: userToDelete }));
    setIsConfirmOpen(false);
    setUserToDelete(null);

    // If last user on page was deleted, go back a page
    const newPage = users.length === 1 && page > 1 ? page - 1 : page;
    setPage(newPage);
    refreshUserList(newPage);
  };

  // Checkbox handlers
  const handleCheckboxChange = (id, isAdmin) => {
    if (isAdmin) return; // Don't allow selecting admins
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allNonAdminIds = users.filter((u) => !u.isAdmin).map((u) => u._id);
    if (selectedUsers.length === allNonAdminIds.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allNonAdminIds);
    }
  };

  // Bulk delete
  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleUsers(selectedUsers));
    if (deleteMultipleUsers.fulfilled.match(res)) {
      setSelectedUsers([]);

      const newPage =
        selectedUsers.length >= users.length && page > 1 ? page - 1 : page;
      setPage(newPage);
      refreshUserList(newPage);
    }
    setIsMultiConfirmOpen(false);
  };

  // Expose everything needed by UI
  return {
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
  };
};
