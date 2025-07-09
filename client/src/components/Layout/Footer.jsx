import { NavLink } from "react-router-dom";

export const Footer = () => {
  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/policy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms & Conditions" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-indigo-50 border-t border-indigo-200 text-indigo-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-indigo-700 mb-3">skyRead</h2>
            <p className="text-sm text-black leading-relaxed">
              Discover meaningful stories, curated insights, and thoughtful
              content that fuels your mind. Crafted for curious readers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {menuLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `hover:text-indigo-500 transition-colors ${
                        isActive ? "text-indigo-600 font-semibold" : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-indigo-500 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="block font-medium">Address</span>
                Somewhere, Earth
              </li>
              <li>
                <span className="block font-medium">Phone</span>
                <a href="tel:+" className="hover:text-indigo-900">
                  +91 000 000 0000
                </a>
              </li>
              <li>
                <span className="block font-medium">Email</span>
                <a href="mailto:" className="hover:text-indigo-900">
                  contact@skyread.com
                </a>
              </li>
              <li>
                <span className="block font-medium">Support</span> 24/7
                Available
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-indigo-200 pt-6 text-center">
          <p className="text-sm text-indigo-500">
            &copy; {new Date().getFullYear()} <strong>skyRead</strong>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
