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
      setRegisterData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-500">Full Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
          name="username"
          value={registerData.username}
          onChange={handleOnChange}
        />
        {fieldErrors?.username && (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.username}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-500">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          name="email"
          autoComplete="username"
          value={registerData.email}
          onChange={handleOnChange}
        />
        {fieldErrors?.email && (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-500">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          autoComplete="current-password"
          name="password"
          value={registerData.password}
          onChange={handleOnChange}
        />
        {fieldErrors?.password && (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-white cursor-pointer text-black py-2 rounded-lg hover:bg-red-600 transition
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Register
      </button>
    </form>
  );
};
