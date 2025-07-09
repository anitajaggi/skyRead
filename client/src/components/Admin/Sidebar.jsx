import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiFileText,
  FiUsers,
  FiMessageCircle,
  FiMessageSquare,
} from "react-icons/fi";

export const Sidebar = ({ onNavigate }) => {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Category", path: "/dashboard/category", icon: <FiGrid /> },
    { name: "Article", path: "/dashboard/article", icon: <FiFileText /> },
    { name: "Users", path: "/dashboard/users", icon: <FiUsers /> },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: <FiMessageCircle />,
    },
    {
      name: "Comments",
      path: "/dashboard/comments",
      icon: <FiMessageSquare />,
    },
  ];

  return (
    <aside className="h-full w-64 bg-white border-r shadow-sm flex flex-col p-6 overflow-auto scrollbar-hide">
      <div className="mb-8 text-3xl font-bold text-indigo-600 tracking-tight">
        <NavLink to="/">skyRead</NavLink>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                end
              >
                <span className="text-lg">{icon}</span>
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
