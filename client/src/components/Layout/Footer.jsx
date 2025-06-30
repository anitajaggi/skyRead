import { NavLink } from "react-router-dom";
export const Footer = () => {
  const menuLink = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/policy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms & Conditions" },
    { path: "/contact", label: "Contact" },
  ];
  return (
    <footer className="bg-gray-100 text-gray-800 pt-16 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-red-600">skyRead</h3>
            <p className="text-gray-600 mb-6">
              Curating thoughtful content that informs and inspires modern
              readers.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                📍 <span className="ml-1">123 Creative Street, Imaginaria</span>
              </li>
              <li>
                📞
                <NavLink to="tel:" className="hover:text-indigo-600 transition">
                  +91 000 000 0000
                </NavLink>
              </li>
              <li>
                📧
                <NavLink
                  to="mailto:"
                  className="hover:text-indigo-600 transition"
                >
                  contact@skyread.com
                </NavLink>
              </li>
              <li>
                🕒 <span className="ml-1">24/7</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {menuLink.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    href="#"
                    className="text-gray-700 hover:text-red-600 transition-colors"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
              Subscribe
            </h4>
            <p className="text-gray-600 mb-4">
              Get the latest articles and updates directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 w-full"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} SkyRead. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
