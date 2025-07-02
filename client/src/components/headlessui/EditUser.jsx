import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const EditUserDialog = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        isAdmin: Boolean(user.isAdmin),
      });
      setAdminError("");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent changing isAdmin if this is the last admin
    if (name === "isAdmin" && user?.isLastAdmin) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      username: formData.username,
      email: formData.email,
      isAdmin: formData.isAdmin,
    };

    if (formData.password.trim()) {
      dataToSave.password = formData.password;
    }

    onSave(user._id, dataToSave);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Edit User
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password (leave blank to keep unchanged)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                {/* Admin checkbox with error handling */}
                <div>
                  {adminError && (
                    <p className="text-sm text-red-600 mb-1">{adminError}</p>
                  )}
                  <div className="flex items-center">
                    <input
                      id="isAdmin"
                      name="isAdmin"
                      type="checkbox"
                      checked={formData.isAdmin}
                      onChange={handleChange}
                      onClick={(e) => {
                        if (user?.isLastAdmin) {
                          e.preventDefault();
                          setAdminError(
                            "Cannot demote the last remaining admin."
                          );
                          toast.error(
                            "Cannot demote the last remaining admin."
                          );
                        } else {
                          setAdminError("");
                        }
                      }}
                      className={`h-4 w-4 text-red-600 border-gray-300 rounded ${
                        user?.isLastAdmin
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                    <label
                      htmlFor="isAdmin"
                      className={`ml-2 block text-sm font-medium text-gray-700 ${
                        user?.isLastAdmin ? "text-gray-400" : ""
                      }`}
                    >
                      Is Admin
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
