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

  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/policy", label: "Privacy" },
    { path: "/terms", label: "Terms" },
    { path: "/contact", label: "Contact" },
  ];

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", closeOnOutsideClick);
      document.addEventListener("keydown", closeOnOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnOutsideClick);
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
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-indigo-700">
            <NavLink to="/" className="hover:text-indigo-500 transition-colors">
              <span className="text-indigo-500">skyRead</span>
            </NavLink>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-indigo-800">
            {menuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-indigo-500 transition-colors ${
                    isActive ? "text-indigo-600 font-semibold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated && <LogoutButton />}
          </nav>

          <div
            onClick={handleUserClick}
            className="text-indigo-700 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            {isAuthenticated ? (
              <span className="text-sm font-medium">
                {user?.isAdmin ? "Dashboard" : "Profile"}
              </span>
            ) : (
              <FaUserCircle className="text-xl" />
            )}
          </div>

          <button
            className="md:hidden text-indigo-700"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <IoClose size={24} /> : <RiMenu3Fill size={24} />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white px-6 py-4 border-t border-indigo-100 space-y-3 text-sm font-medium text-indigo-800">
          {menuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block hover:text-indigo-500"
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
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="block hover:text-indigo-500"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
