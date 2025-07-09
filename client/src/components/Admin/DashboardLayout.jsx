import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { useMediaQuery } from "../../utils/hook/useMediaQuery";
import { useEffect, useRef, useState } from "react";

export const DashboardLayout = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    if (!isSidebarOpen || isDesktop) return;

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isDesktop]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all sticky top-0 duration-300 overflow-auto scrollbar-hide bg-white shadow-md`}
      >
        <Sidebar onNavigate={() => !isDesktop && setIsSidebarOpen(false)} />
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
