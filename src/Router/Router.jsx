// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../LayOut/MainLayOut";

// Pages
import Home from "../Pages/Home";
import Login from "../AuthLayOut/Login";
import Register from "../AuthLayOut/Register";

// Components
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedDashboard from "../components/RoleBasedDashboard";

// Admin Pages

import StudentSidebar from "../components/StudentSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import AdminSidebar from "../components/AdminSidebar";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/auth",
    element: <AuthLayOut />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleBasedDashboard />
      </PrivateRoute>
    ),
    children: [
      // Admin Routes
      {
        path: "admin",
        element:<AdminSidebar></AdminSidebar>
       
      },
      // Teacher Routes
      {
        path: "teacher",
        element:<TeacherSidebar></TeacherSidebar>
       
      },
      // Student Routes
      {
        path: "student",
        element:<StudentSidebar></StudentSidebar>
       
      },
    ],
  },
]);

export default router;
