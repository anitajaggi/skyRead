import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./utils/PrivateRoute";
import AuthProvider from "./utils/authProvider";

// Pages
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { PrivacyPolicy } from "./components/Policy";
import { TermsAndConditions } from "./components/Terms";
import { AuthTabs } from "./components/Auths";
import { UserDashboard } from "./components/user/UserDashboard";

// admin imports
import { DashboardLayout } from "./components/Admin/DashboardLayout";
import { Dashboard } from "./components/Admin/Dashboard";
import { Messages } from "./components/Admin/contact/messages";
import { Article } from "./components/Admin/articles/Article";
import { AllUsers } from "./components/Admin/Users/AllUsers";
import { Category } from "./components/Admin/Category/Category";
import { ArticleDetails } from "./components/ArticleDetails";

// Not found page
import { NotFoundPage } from "./components/Ui/404NotFound";

import { UpdateProfileByUser } from "./components/user/UpdateProfile";
import { Contact } from "./components/Contact";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/policy", element: <PrivacyPolicy /> },
        { path: "/terms", element: <TermsAndConditions /> },
        { path: "/contact", element: <Contact /> },
        { path: "/auth", element: <AuthTabs /> },
        { path: "/articles/:slug", element: <ArticleDetails /> },

        {
          element: <PrivateRoute />,
          children: [
            {
              path: "/dashboard",
              element: <DashboardLayout />,
              children: [
                { index: true, element: <Dashboard /> },
                { path: "/dashboard/category", element: <Category /> },
                { path: "/dashboard/blogs", element: <h1>Blogs</h1> },
                { path: "/dashboard/users", element: <AllUsers /> },
                { path: "/dashboard/messages", element: <Messages /> },
                { path: "/dashboard/profile", element: <UserDashboard /> },
                { path: "/dashboard/article", element: <Article /> },
                {
                  path: "/dashboard/setting",
                  element: <UpdateProfileByUser />,
                },
              ],
            },
            { path: "/profile", element: <UserDashboard /> },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </>
  );
};

export default App;
