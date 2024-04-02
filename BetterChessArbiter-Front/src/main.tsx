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
import VerifyTournamentsPage from "./pages/VerifyTournamentsPage";
import OrganizeTournamentsPage from "./pages/OrganizeTournamentPage";
import TournamentPage from "./pages/TournamentPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./helpers/RequireAuth";
import { roles } from "./constants";
import UnauthorizedPage from "./pages/UnauthorizedPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <HomePage />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <LoginPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <RegisterPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/adminpanel",
    element: (
      <RequireAuth requiredRole={roles.admin}>
        <Navbar />
        <AdminPanelPage />
        <Footer />
      </RequireAuth>
    ),
  },
  {
    path: "/favouritetournaments",
    element: (
      <>
        <Navbar />
        <FavouriteTournamentsPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/verifytournaments",
    element: (
      <>
        <Navbar />
        <VerifyTournamentsPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/organize",
    element: (
      <RequireAuth requiredRole={roles.admin || roles.organizer}>
        <Navbar />
        <OrganizeTournamentsPage />
        <Footer />
      </RequireAuth>
    ),
  },
  {
    path: "/tournament/:id",
    element: (
      <>
        <Navbar />
        <TournamentPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <>
        <Navbar />
        <UserPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/error",
    element: (
      <>
        <Navbar />
        <ErrorPage />
        <Footer />
      </>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <>
        <Navbar />
        <UnauthorizedPage />
        <Footer />
      </>
    ),
  },
  { path: "*", element: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
