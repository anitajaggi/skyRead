import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentUser, loginUser } from "../../features/Auth/authThunk";

export const LoginForm = () => {
  // const { error } = useSelector((state) => state.auth);
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
      </div>
      {/* {error && <p className="text-red-600 mt-2">{error.message}</p>} */}
      <button
        type="submit"
        className="w-full bg-white text-black cursor-pointer py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
        disabled={!loginData.email || !loginData.password}
      >
        Login
      </button>
    </form>
  );
};
