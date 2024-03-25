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
    element: <AdminPanelPage />,
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
  { element: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
