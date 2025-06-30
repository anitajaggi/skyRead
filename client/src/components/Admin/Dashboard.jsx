import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/Auth/authThunk";
import { fetchContacts } from "../../features/contact/contactThunk";
import { getAllCategories } from "../../features/categories/categoryThunks";
import { fetchArticles } from "../../features/Article/articleThunk";
import { NavLink } from "react-router-dom";
export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { contacts } = useSelector((state) => state.contacts);
  const { categories } = useSelector((state) => state.category);
  const { articles } = useSelector((state) => state.articles);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getAllUsers());
      dispatch(fetchContacts());
      dispatch(getAllCategories());
      dispatch(fetchArticles());
    }
  }, [dispatch, user]);

  const totalUsers = users?.length || 0;
  const totalMessages = contacts?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalArticles = articles?.length || 0;

  return (
    <div className="flex min-h-screen">
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
            <p className="mt-2">{totalMessages}</p>
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
