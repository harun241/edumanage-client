import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../layout/MainLayOut";
import StudentDashboardLayout from "../layout/StudentDashboardLayout";
import TeacherDashboardLayout from "../layout/TeacherDashboardLayout";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AllClassesLayout from "../layout/AllClassesLayout"; // for /all-classes

// Public Pages
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

// Other Pages
import ClassDetails from "../pages/ClassDetails"; // case-sensitive import

// Teacher Request Form (correct import path, adjust if your folder is 'pages' lowercase)
import TeacherRequestForm from "../pages/Dashboard/Teacher/TeacherRequestForm";

export const router = createBrowserRouter([
  // Public routes
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

  // Classes listing & details - partially protected
  {
    path: "/all-classes",
    element: <AllClassesLayout />, // renders <Outlet />
    children: [
      { index: true, element: <AllClasses /> }, // public class list page
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

  // Dashboard routes - fully protected & role based
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleBasedDashboard />
      </PrivateRoute>
    ),
    children: [
      // Admin Dashboard
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

      // Teacher Dashboard
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

      // Student Dashboard
      {
        path: "student",
        element: <StudentDashboardLayout />,
        children: [
          { index: true, element: <MyEnrolledClasses /> },
          { path: "my-classes", element: <MyEnrolledClasses /> },
          { path: "my-classes/:id", element: <EnrolledClassDetails /> },
          { path: "orders", element: <Orders /> },
          { path: "profile", element: <StudentProfile /> },

          // Corrected path here (relative path, no leading slash)
          {
            path: "teach",
            element: (
              <PrivateRoute>
                <TeacherRequestForm />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
