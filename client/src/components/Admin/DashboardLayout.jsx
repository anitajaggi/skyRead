import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { useMediaQuery } from "../../utils/hook/useMediaQuery";
import { useEffect, useState } from "react";

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
      <div className="flex-1 overflow-auto bg-gray-50 scrollbar-hide">
        <AdminHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
