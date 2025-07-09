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

  const cards = [
    {
      title: "Users",
      count: totalUsers,
      link: "/dashboard/users",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "Messages",
      count: totalContacts,
      link: "/dashboard/messages",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Categories",
      count: totalCategories,
      link: "/dashboard/category",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Articles",
      count: totalArticles,
      link: "/dashboard/article",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, Admin</h2>
          <p className="text-red-600 font-semibold mt-1">{user.username}</p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <NavLink
              to={card.link}
              key={idx}
              className={`rounded-2xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 bg-white border-t-4 ${card.color}`}
            >
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-3xl font-bold">{card.count}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
