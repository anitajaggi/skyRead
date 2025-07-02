import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContactMessage,
  deleteMultipleContacts,
} from "../../../features/contact/contactThunk";

import { ConfirmDialog } from "../../headlessui/ConfirmDialog";

export const Messages = () => {
  const dispatch = useDispatch();
  const { contacts, currentPage, totalPages, loading } = useSelector(
    (state) => state.contacts
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    dispatch(fetchContacts({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDeleteClick = (id) => {
    setMessageToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;
    const res = await dispatch(deleteContactMessage(messageToDelete));

    setIsConfirmOpen(false);
    setMessageToDelete(null);
    if (contacts.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    } else {
      dispatch(fetchContacts({ page, limit }));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = contacts.map((msg) => msg._id);
    if (selectedMessages.length === contacts.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(allIds);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMessages.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleContacts(selectedMessages));
    if (deleteMultipleContacts.fulfilled.match(res)) {
      setSelectedMessages([]);
      dispatch(fetchContacts({ page, limit }));
    }
    setIsMultiConfirmOpen(false);
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Messages</h2>
        {selectedMessages.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedMessages.length})
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedMessages.length === contacts.length &&
                    contacts.length > 0
                  }
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
                  />
                </td>
                <td className="px-6 py-4">{index + 1}</td>
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
