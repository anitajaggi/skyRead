import { NavLink } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdMenuOpen } from "react-icons/md";
import { LogoutButton } from "../Ui/Logout";
import { useSelector } from "react-redux";

export const AdminHeader = ({ setIsSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const initial = user.username?.charAt(0).toUpperCase() || "?";

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="text-gray-600 cursor-pointer hover:text-indigo-600 text-xl transition p-2 rounded-md hover:bg-gray-100"
        aria-label="Toggle Sidebar"
      >
        <MdMenuOpen />
      </button>

      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg flex items-center justify-center border-2 border-indigo-400">
          {initial}
        </div>

        <NavLink
          to="/dashboard/setting"
          className={({ isActive }) =>
            `p-2 rounded-md transition hover:bg-indigo-50 ${
              isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
            }`
          }
          aria-label="Settings"
        >
          <FiSettings size={20} />
        </NavLink>

        <NavLink
          to="/auth"
          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
        >
          <LogoutButton />
          <FiLogOut size={20} />
        </NavLink>
      </div>
    </header>
  );
};
