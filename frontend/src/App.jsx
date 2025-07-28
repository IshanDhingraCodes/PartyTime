import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import useAdminStore from "./store/useAdminStore";
import AdminLayout from "./layout/AdminLayout";
import CategoriesPage from "./pages/admin/CategoriesPage";
import DecorationsPage from "./pages/admin/DecorationsPage";
import MessagesPage from "./pages/admin/MessagesPage";
import { Skeleton } from "./components/ui/skeleton";
import UserLayout from "./layout/UserLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import CatalogPage from "./pages/CatalogPage";

const App = () => {
  const { isLoggedIn, checkAuth } = useAdminStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-4 w-80">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <Skeleton className="h-10 w-1/2 mx-auto mt-4" />
        </div>
      </div>
    );

  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              isLoggedIn ? (
                <DashboardPage />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="categories"
            element={
              isLoggedIn ? (
                <CategoriesPage />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="decorations"
            element={
              isLoggedIn ? (
                <DecorationsPage />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
          <Route
            path="messages"
            element={
              isLoggedIn ? (
                <MessagesPage />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />
        </Route>
        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="catalog" element={<CatalogPage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
