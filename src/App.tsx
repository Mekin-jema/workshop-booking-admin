// src/App.tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workshops from "./pages/admin/Workshops";
// import CreateWorkshop from "./pages/admin/CreateWorkshop";
import TimeSlots from "./pages/admin/TimeSlots";
import Bookings from "./pages/admin/Bookings";
import Invoices from "./pages/admin/Invoices";
import Users from "./pages/admin/Users";
// import Team from "./pages/admin/Team";
import WorkshopAnalytics from "./pages/admin/WorkshopAnalytics";
import BookingAnalytics from "./pages/admin/BookingAnalytics";
import Profile from "./pages/admin/Profile";
import Settings from "./pages/admin/Settings";
import Dashboard from "./admin/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <AdminLayout />, // 🟢 Use layout here
    children: [
      { index: true, element: <Dashboard /> },
      { path: "workshops", element: <Workshops /> },
      // { path: "workshops/create", element: <CreateWorkshop /> },
      { path: "time-slots", element: <TimeSlots /> },
      { path: "bookings", element: <Bookings /> },
      { path: "invoices", element: <Invoices /> },
      { path: "users", element: <Users /> },
      // { path: "team", element: <Team /> },
      { path: "analytics/workshops", element: <WorkshopAnalytics /> },
      { path: "analytics/bookings", element: <BookingAnalytics /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
