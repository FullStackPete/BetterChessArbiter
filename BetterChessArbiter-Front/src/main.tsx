import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import FavouriteTournamentsPage from "./pages/FavouriteTournamentsPage";
import ManageTournamentsPage from "./pages/ManageTournamentsPage";
import OrganizeTournamentsPage from "./pages/OrganizeTournamentPage";
import TournamentPage from "./pages/TournamentPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./helpers/RequireAuth";
import { roles } from "./constants";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { Admin } from "mongodb";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/adminpanel",
    element: (
      <RequireAuth requiredRole={roles.admin}>
        <AdminPanelPage />
      </RequireAuth>
    ),
  },
  {
    path: "/favouritetournaments",
    element: <FavouriteTournamentsPage />,
  },
  {
    path: "/managetournaments",
    element: <ManageTournamentsPage />,
  },
  {
    path: "/organize",
    element: <OrganizeTournamentsPage />,
  },
  {
    path: "/tournament/:id",
    element: <TournamentPage />,
  },
  {
    path: "/user/:id",
    element: <UserPage />,
  },
  { path: "*", element: <ErrorPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
);
