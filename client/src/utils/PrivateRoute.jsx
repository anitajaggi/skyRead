// utils/PrivateRoute.jsx
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentUser } from "../features/Auth/authThunk";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(currentUser());
      setChecked(true);
    };

    checkAuth();
  }, [dispatch]);

  if (!checked || loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
