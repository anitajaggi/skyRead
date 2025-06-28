import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/Auth/authThunk";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-500 cursor-pointer">
      Logout
    </button>
  );
};
