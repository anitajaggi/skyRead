import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, loginUser } from "../../features/Auth/authThunk";
import { clearFieldError } from "../../features/Auth/authSlice";

export const LoginForm = () => {
  const { fieldErrors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(loginData));
    if (loginUser.fulfilled.match(res)) {
      const userRes = await dispatch(currentUser());
      const user = userRes.payload;

      if (user?.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

      setLoginData({ email: "", password: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-indigo-700 text-center">Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border border-indigo-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
          placeholder="you@example.com"
          value={loginData.email}
          onChange={handleOnChange}
          autoComplete="username"
        />
        {fieldErrors?.email && (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border border-indigo-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
          placeholder="••••••••"
          autoComplete="current-password"
          value={loginData.password}
          onChange={handleOnChange}
        />
        {fieldErrors?.password && (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
};
