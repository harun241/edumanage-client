// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../LayOut/MainLayOut";
import StudentDashboardLayout from "../LayOut/StudentDashboardLayout";
import TeacherDashboardLayout from "../LayOut/TeacherDashboardLayout";
import AdminDashboardLayout from "../LayOut/AdminDashboardLayout";


// Pages
import Home from "../Pages/Home";
import Login from "../AuthLayOut/Login";
import Register from "../AuthLayOut/Register";

// Components
import PrivateRoute from "../components/PrivateRoute";
import RoleBasedDashboard from "../components/RoleBasedDashboard";

// Admin Pages
import AllClasses from "../pages/Dashboard/Admin/AllClasses";
import Users from "../pages/Dashboard/Admin/Users";
import TeacherRequest from "../pages/Dashboard/Admin/TeacherRequest";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";

// Teacher Pages
import MyClass from "../pages/Dashboard/Teacher/MyClass";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import TeacherClassDetails from "../pages/Dashboard/Teacher/ClassDetails";
import TeacherProfile from "../Pages/Dashboard/Teacher/TeacherProfile";

// Student Pages
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses";
import EnrolledClassDetails from "../pages/Dashboard/Student/EnrolledClassDetails";
import Orders from "../pages/Dashboard/Student/Orders";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";


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
    { path: "all-classes", element: <AllClasses /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleBasedDashboard />
      </PrivateRoute>
    ),
    children: [
      // Admin dashboard with sidebar layout + nested routes
      {
        path: "admin",
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <AllClasses /> },  // default admin page
          { path: "all-classes", element: <AllClasses /> },
          { path: "users", element: <Users /> },
          { path: "teacher-requests", element: <TeacherRequest /> },
          { path: "profile", element: <AdminProfile /> },
        ],
      },

      // Teacher dashboard
      {
        path: "teacher",
        element: <TeacherDashboardLayout />,
        children: [
          { index: true, element: <MyClass /> },  // default teacher page
          { path: "add-class", element: <AddClass /> },
          { path: "my-class", element: <MyClass /> },
          { path: "my-classes/:id", element: <TeacherClassDetails /> },
          { path: "profile", element: <TeacherProfile /> },
        ],
      },

      // Student dashboard
      {
        path: "student",
        element: <StudentDashboardLayout />,
        children: [
          { index: true, element: <MyEnrolledClasses /> }, // default student page
          { path: "my-classes", element: <MyEnrolledClasses /> },
          { path: "my-classes/:id", element: <EnrolledClassDetails /> },
          { path: "orders", element: <Orders /> },
          { path: "profile", element: <StudentProfile /> },
        ],
      },
    ],
  },
]);

export default router;
