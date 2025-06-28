import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { LogoutButton } from "../Ui/Logout";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuLink = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/policy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms & Conditions" },
    { path: "/contact", label: "Contact" },
  ];

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyOrClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleKeyOrClick);
      document.addEventListener("keydown", handleKeyOrClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleKeyOrClick);
      document.removeEventListener("keydown", handleKeyOrClick);
    };
  }, [isOpen]);

  const handleUserClick = () => {
    if (loading || isAuthenticated === null) return;

    if (!isAuthenticated) {
      navigate("/auth");
    } else if (user?.isAdmin) {
      navigate("/dashboard");
    } else {
      navigate("/profile");
    }
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-black flex items-center gap-3">
            <NavLink to={"/"}>skyRead</NavLink>
            <div
              className="text-black text-sm mt-2 cursor-pointer"
              onClick={handleUserClick}
            >
              {isAuthenticated ? (
                <span className="font-medium">
                  {user?.isAdmin ? "Dashboard" : "Account"}
                </span>
              ) : (
                <FaUserCircle className="text-xl" />
              )}
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-black font-medium">
            {menuLink.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="hover:text-red-500"
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? <LogoutButton /> : ""}
          </nav>
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose size={24} /> : <RiMenu3Fill size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`absolute top-15 left-0 w-full bg-white px-4 pt-2 pb-4 space-y-2 shadow-md transition-all transform origin-top duration-300 md:hidden ${
          isOpen
            ? "scale-y-100 opacity-100 pointer-events-auto"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {menuLink.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-teal-600"
          >
            {link.label}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <div onClick={() => setIsOpen(false)}>
            <LogoutButton />
          </div>
        ) : (
          <NavLink
            to={"/auth"}
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-teal-600"
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};
