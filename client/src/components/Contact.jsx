import { useState } from "react";
import { sendContactMessage } from "../features/contact/contactThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearFieldError } from "../features/contact/contactSlice";

export const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const dispatch = useDispatch();
  const { fieldErrors } = useSelector((state) => state.contacts);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendContactMessage(formData));

    if (sendContactMessage.fulfilled.match(res)) {
      setFormData({
        username: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 py-20">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Get in touch</h2>
          <p className="text-gray-600">We welcome any feedback or fan mail.</p>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17.657 16.657A8 8 0 016.343 5.343l1.414 1.414a6 6 0 008.486 8.486l1.414 1.414z" />
                <path d="M15 12h.01" />
              </svg>
              <span>+91 0000 000 000</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>location</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="John Doe"
              className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-blue-500 ${
                fieldErrors?.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors?.username && (
              <p className="text-red-600 text-sm mt-1">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 ${
                fieldErrors?.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors?.email && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-blue-500 ${
                fieldErrors?.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors?.message && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
