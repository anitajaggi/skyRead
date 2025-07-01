import { NavLink } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdMenuOpen } from "react-icons/md";
import { LogoutButton } from "../Ui/Logout";
import { useSelector } from "react-redux";

export const AdminHeader = ({ setIsSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const initial = user.username?.charAt(0).toUpperCase() || "?";

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-800 transition"
      >
        <MdMenuOpen />
      </button>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-green-600 text-xl text-center font-bold text-green-500">
          {initial}
        </div>
        <NavLink
          to="/dashboard/setting"
          className={({ isActive }) =>
            `text-gray-600 hover:text-indigo-600 transition ${
              isActive ? "text-indigo-600 font-semibold" : ""
            }`
          }
        >
          <FiSettings size={20} />
        </NavLink>

        <NavLink
          to={"/auth"}
          className="flex gap-2 items-center text-red-500 hover:text-red-500 transition"
        >
          <LogoutButton />
          <FiLogOut size={20} />
        </NavLink>
      </div>
    </header>
  );
};
