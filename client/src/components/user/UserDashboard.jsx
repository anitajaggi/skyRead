import { useSelector } from "react-redux";
import { UpdateProfileByUser } from "./UpdateProfile";

export const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="dashboard text-center max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="font-bold text-3xl">User Dashboard</h2>
      <p className="mb-5">
        Welcome {""}
        <span className="text-red-600 uppercase font-bold">
          {user.username}
        </span>
      </p>

      <UpdateProfileByUser />
    </div>
  );
};
