import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/Auth/authThunk";

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
      className="space-y-5 my-5 bg-black border p-5 text-left rounded max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Email (unchangeable)
        </label>
        <input
          value={user?.email}
          readOnly
          disabled
          className="w-full mt-1 p-2 bg-gray-800 text-gray-400 border border-gray-600 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Username
        </label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded bg-white text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          New Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Leave blank to keep current password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-600 rounded bg-white text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-red-800 transition"
      >
        Update Profile
      </button>
    </form>
  );
};
