import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", exact: true },
    { name: "Category", path: "/dashboard/category" },
    { name: "Article", path: "/dashboard/article" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Messages", path: "/dashboard/messages" },
    { name: "Comments", path: "/dashboard/comments" },
  ];

  return (
    <div className="sticky top-0 h-screen w-64 bg-white flex flex-col overflow-auto p-6 scrollbar-hide">
      <NavLink to={"/"} className="text-2xl font-bold mb-6">
        skyRead
      </NavLink>
      <nav>
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-red-200 text-black"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                end={link.exact}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
