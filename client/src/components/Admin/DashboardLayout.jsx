import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useMediaQuery } from "../../utils/hook/useMediaQuery";
import { MdMenuOpen } from "react-icons/md";

export const DashboardLayout = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all sticky top-0 duration-300 overflow-auto scrollbar-hide bg-white shadow-md`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-auto scrollbar-hide">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="mb-4 px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-800 transition"
        >
          <MdMenuOpen />
        </button>

        <Outlet />
      </div>
    </div>
  );
};
