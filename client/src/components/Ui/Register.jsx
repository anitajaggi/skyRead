import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, registerUser } from "../../features/Auth/authThunk";
import { useNavigate } from "react-router-dom";
import { clearFieldError } from "../../features/Auth/authSlice";

export const RegisterForm = () => {
  const { fieldErrors } = useSelector((state) => state.auth);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(registerData));
    if (registerUser.fulfilled.match(res)) {
      await dispatch(currentUser());
      navigate("/profile");
      setRegisterData({ username: "", email: "", password: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md space-y-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
        Create Account
      </h2>

      <div>
        <label className="block text-sm font-medium text-indigo-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleOnChange}
          placeholder="John Doe"
          className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        {fieldErrors?.username && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleOnChange}
          autoComplete="username"
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        {fieldErrors?.email && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleOnChange}
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        {fieldErrors?.password && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Register
      </button>
    </form>
  );
};
