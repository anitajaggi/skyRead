import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../features/Auth/authThunk";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return children;
};

export default AuthProvider;
