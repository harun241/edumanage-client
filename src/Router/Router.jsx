import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../layout/MainLayOut";
import StudentDashboardLayout from "../layout/StudentDashboardLayout";
import TeacherDashboardLayout from "../layout/TeacherDashboardLayout";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AllClassesLayout from "../layout/AllClassesLayout"; // for /all-classes

// Pages (Public)
import Home from "../pages/Home";
import Login from "../AuthLayOut/Login";
import Register from "../AuthLayOut/Register";

// Route Guards
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedDashboard from "../components/RoleBasedDashboard";

// Admin Pages
import AllClasses from "../pages/Dashboard/Admin/AllClasses";
import Users from "../pages/Dashboard/Admin/Users";
import TeacherRequest from "../pages/Dashboard/Admin/TeacherRequest";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";

// Teacher Pages
import MyClass from "../pages/Dashboard/Teacher/MyClass";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import TeacherClassDetails from "../pages/Dashboard/Teacher/TeacherClassDetails";
import TeacherProfile from "../pages/Dashboard/Teacher/TeacherProfile";

// Student Pages
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses";
import EnrolledClassDetails from "../pages/Dashboard/Student/EnrolledClassDetails";
import Orders from "../pages/Dashboard/Student/Orders";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";

import ClassDetails from "../pages/ClassDetails"; // case-sensitive import
import TeacherRequestForm from "../Pages/Dashboard/Teacher/TeacherRequestForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      { index: true, element: <Home /> },
     
    ],
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
    path: "/all-classes",
    element: <AllClassesLayout />, // renders <Outlet />
    children: [
      { index: true, element: <AllClasses /> }, // classes list page
      {
        path: "class/:id",
        element: (
          <PrivateRoute>
            <ClassDetails />
          </PrivateRoute>
        ),
      },
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
      {
        path: "admin",
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <AllClasses /> },
          { path: "all-classes", element: <AllClasses /> },
          { path: "users", element: <Users /> },
          { path: "teacher-requests", element: <TeacherRequest /> },
          { path: "profile", element: <AdminProfile /> },
        ],
      },
      {
        path: "teacher",
        element: <TeacherDashboardLayout />,
        children: [
          { index: true, element: <MyClass /> },
          { path: "add-class", element: <AddClass /> },
          { path: "my-class", element: <MyClass /> },
          { path: "my-classes/:id", element: <TeacherClassDetails /> },
          { path: "profile", element: <TeacherProfile /> },
   
        ],
      },
      {
        path: "student",
        element: <StudentDashboardLayout />,
        children: [
          { index: true, element: <MyEnrolledClasses /> },
          { path: "my-classes", element: <MyEnrolledClasses /> },
          { path: "my-classes/:id", element: <EnrolledClassDetails /> },
          { path: "orders", element: <Orders /> },
          { path: "profile", element: <StudentProfile /> },
          { path: "teacher-request", element: <TeacherRequestForm/> },
        ],
      },
    ],
  },
]);

export default router;
