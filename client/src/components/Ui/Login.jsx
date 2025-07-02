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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-500">Email</label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border text-white border-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <label className="block text-gray-500">Password</label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border text-white border-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="w-full bg-white text-black cursor-pointer py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
};
