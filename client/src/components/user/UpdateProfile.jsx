import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, currentUser } from "../../features/Auth/authThunk";

export const UpdateProfileByUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(formData));
    await dispatch(currentUser());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (read-only)
        </label>
        <input
          value={user?.email}
          readOnly
          disabled
          className="w-full px-4 py-2 bg-gray-100 text-gray-500 border border-gray-300 rounded-md cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Leave blank to keep current password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Update Profile
      </button>
    </form>
  );
};
