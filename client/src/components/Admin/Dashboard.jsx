import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/Auth/authThunk";
import { fetchContacts } from "../../features/contact/contactThunk";
import { getAllCategories } from "../../features/categories/categoryThunks";
import { fetchArticles } from "../../features/Article/articleThunk";
import { NavLink } from "react-router-dom";
export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { totalUsers } = useSelector((state) => state.users);
  const { totalContacts } = useSelector((state) => state.contacts);
  const { totalCategories } = useSelector((state) => state.category);
  const { totalArticles } = useSelector((state) => state.articles);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getAllUsers({ totalUsers }));
      dispatch(fetchContacts({ totalContacts }));
      dispatch(getAllCategories({ totalCategories }));
      dispatch(fetchArticles({ totalArticles }));
    }
  }, [dispatch, user]);

  return (
    <div className="flex">
      <div className="flex-1 p-1">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="mt-2 font-bold text-red-600">{user.username}</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4">
          <div className="p-4 bg-white shadow rounded">
            <NavLink
              to="/dashboard/users"
              className="text-xl font-semibold hover:underline hover:text-gray-500"
            >
              Total Users
            </NavLink>
            <p className="mt-2">{totalUsers}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <NavLink
              to="/dashboard/messages"
              className="text-xl font-semibold hover:underline hover:text-gray-500"
            >
              Total Messages
            </NavLink>
            <p className="mt-2">{totalContacts}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <NavLink
              to="/dashboard/category"
              className="text-xl font-semibold hover:underline hover:text-gray-500"
            >
              Total Categories
            </NavLink>
            <p className="mt-2">{totalCategories}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <NavLink
              to="/dashboard/article"
              className="text-xl font-semibold hover:underline hover:text-gray-500"
            >
              Total Articles
            </NavLink>
            <p className="mt-2">{totalArticles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
