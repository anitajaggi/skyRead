import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AppLayout = () => {
  const location = useLocation();

  // Paths where header/footer should be hidden
  const hideLayoutForPaths = ["/dashboard"];

  // Check if current route starts with any hidden path
  const isAdminRoute = hideLayoutForPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
};
