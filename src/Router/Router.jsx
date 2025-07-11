// /src/Router/Router.jsx

import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Login from "../AuthLayOut/Login";
import Register from "../AuthLayOut/Register";
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../LayOut/MainLayOut";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import AddClass from "../Pages/Dashboard/AddClass";
import MyClass from "../Pages/Dashboard/MyClass";
import ClassDetails from "../Pages/Dashboard/ClassDetails";
import Profile from "../Pages/Dashboard/Profile";  // <-- Import করো

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayOut />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-class",
        element: <AddClass />,
      },
      {
        path: "my-class",
        element: <MyClass />,
      },
      {
        path: "my-class/:id",
        element: <ClassDetails />,
      },
      {
        path: "profile",           
        element: <Profile />,      
      },
    ],
  },
]);

export default router;
