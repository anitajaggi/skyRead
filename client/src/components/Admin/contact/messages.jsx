import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContactMessage,
} from "../../../features/contact/contactThunk";

import { ConfirmDialog } from "../../headlessui/ConfirmDialog";

export const Messages = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setMessageToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;
    const res = await dispatch(deleteContactMessage(messageToDelete));
    if (deleteContactMessage.fulfilled.match(res)) {
      await dispatch(fetchContacts());
    }
    setIsConfirmOpen(false);
    setMessageToDelete(null);
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
      </div>
      <div className="overflow-x-auto">
        {loading && <p>Loading categories...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((msg, index) => (
              <tr key={index} className="border-b">
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

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
      />
    </div>
  );
};
