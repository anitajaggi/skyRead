import { useSelector } from "react-redux";
import { UpdateProfileByUser } from "./UpdateProfile";

export const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white min-h-screen mt-5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome,{" "}
            <span className="text-indigo-600 capitalize">{user.username}</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Manage your account details below
          </p>
        </div>

        <UpdateProfileByUser />
      </div>
    </div>
  );
};
