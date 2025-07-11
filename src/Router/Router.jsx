import { createBrowserRouter } from "react-router";

import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home";
import Login from "../AuthLayOut/Login";
import Register from "../AuthLayOut/Register";
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

// Layouts
import AdminDashboardLayout from "../LayOut/AdminDashboardLayout";
import TeacherDashboardLayout from "../LayOut/TeacherDashboardLayout";
import StudentDashboardLayout from "../LayOut/StudentDashboardLayout";



// Teacher Pages
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import MyClass from "../Pages/Dashboard/Teacher/MyClass";
import TeacherClassDetails from "../pages/Dashboard/Teacher/ClassDetails";
import Profile from "../pages/Dashboard/Teacher/Profile";
// Admin Pages
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest";
import Users from "../pages/Dashboard/Admin/Users";



// Student Pages
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses";
import EnrolledClassDetails from "../pages/Dashboard/Student/EnrolledClassDetails";
import Orders from "../pages/Dashboard/Student/Orders";
import AllClasses from "../Pages/Dashboard/Admin/AllClasses";





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

  // 🔐 Admin Dashboard
  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute>
        <RoleBasedRoute allowedRoles={["admin"]}>
          <AdminDashboardLayout />
        </RoleBasedRoute>
      </PrivateRoute>
    ),
    children: [
      { path: "all-classes", element: <AllClasses/> },
      { path: "users", element: <Users /> },
      { path: "teacher-requests", element: <TeacherRequest /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  // 👨‍🏫 Teacher Dashboard
  {
    path: "/dashboard/teacher",
    element: (
      <PrivateRoute>
        <RoleBasedRoute allowedRoles={["teacher"]}>
          <TeacherDashboardLayout />
        </RoleBasedRoute>
      </PrivateRoute>
    ),
    children: [
      { path: "add-class", element: <AddClass /> },
      { path: "my-class", element: <MyClass /> },
      { path: "my-classes/:id", element: <TeacherClassDetails /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  // 👩‍🎓 Student Dashboard
  {
    path: "/dashboard/student",
    element: (
      <PrivateRoute>
        <RoleBasedRoute allowedRoles={["student"]}>
          <StudentDashboardLayout />
        </RoleBasedRoute>
      </PrivateRoute>
    ),
    children: [
      { path: "my-classes", element: <MyEnrolledClasses /> },
      { path: "my-classes/:id", element: <EnrolledClassDetails /> },
      { path: "orders", element: <Orders /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
