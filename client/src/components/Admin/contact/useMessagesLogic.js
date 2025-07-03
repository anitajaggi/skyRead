import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContactMessage,
  deleteMultipleContacts,
} from "../../../features/contact/contactThunk";

// Handles all logic and state for the Messages component
export const useMessagesLogic = () => {
  const dispatch = useDispatch();

  // Get contact-related state from Redux
  const { contacts, currentPage, totalPages, loading } = useSelector(
    (state) => state.contacts
  );

  // Pagination and selection state
  const [page, setPage] = useState(1);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Deletion dialog states
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const limit = 10; // Messages per page

  // Fetch contact messages for current page
  const refreshMessages = (pageToFetch) => {
    dispatch(fetchContacts({ page: pageToFetch, limit }));
  };

  // Fetch messages on mount or when page changes
  useEffect(() => {
    refreshMessages(page);
  }, [dispatch, page, limit]);

  // Handle single message deletion
  const handleDeleteClick = (id) => {
    setMessageToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;

    const res = await dispatch(deleteContactMessage(messageToDelete));
    setIsConfirmOpen(false);
    setMessageToDelete(null);

    // Go back a page if last message on current page is deleted
    if (deleteContactMessage.fulfilled.match(res)) {
      if (contacts.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshMessages(page);
      }
    }
  };

  // Select/deselect individual message
  const handleCheckboxChange = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  // Toggle all message selection
  const handleSelectAll = () => {
    const allIds = contacts.map((msg) => msg._id);
    setSelectedMessages((prev) =>
      prev.length === contacts.length ? [] : allIds
    );
  };

  // Bulk delete setup
  const handleBulkDelete = () => {
    if (selectedMessages.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleContacts(selectedMessages));

    if (deleteMultipleContacts.fulfilled.match(res)) {
      setSelectedMessages([]);

      // Refresh messages after bulk delete
      if (contacts.length === selectedMessages.length && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        refreshMessages(page);
      }
    }

    setIsMultiConfirmOpen(false);
  };

  return {
    contacts,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedMessages,
    isConfirmOpen,
    isMultiConfirmOpen,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  };
};
