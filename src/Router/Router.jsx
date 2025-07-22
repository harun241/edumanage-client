// src/router/router.jsx
import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Layouts
import AuthLayout from "../AuthLayOut/AuthLayOut";
import MainLayout from "../layout/MainLayOut";
import StudentDashboardLayout from "../layout/StudentDashboardLayout";
import TeacherDashboardLayout from "../layout/TeacherDashboardLayout";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AllClassesLayout from "../layout/AllClassesLayout";

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
import TeacherRequestForm from "../pages/Dashboard/Teacher/TeacherRequestForm";

// Student Pages
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses";
import EnrolledClassDetails from "../Pages/Dashboard/Student/MyEnrolledClassDetails";
import Orders from "../pages/Dashboard/Student/Orders";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";

// Other Pages
import ClassDetails from "../pages/ClassDetails";
import Payment from "../components/Payment";
import MyEnrolledClassDetails from "../Pages/Dashboard/Student/MyEnrolledClassDetails";
import MyClasses from "../pages/Dashboard/Teacher/MyClass";
import ErrorPage from "../Pages/ErrorPage";

const stripePromise = loadStripe("pk_test_51Rm3ScQZQai0rO82528C1QcnbC7n1PUdkiZP2qotPdfRQRNWKPZSPP36tZ6NEB6eyqi2pbLHxmw7EJZSIC0BIQWS00HnTTXDCt");

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
     errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // Classes listing & details (partial private)
  {
    path: "/all-classes",
    element: <AllClassesLayout />,
    children: [
      { index: true, element: <AllClasses /> }, // public list page
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

  // Dashboard - fully protected, role based
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleBasedDashboard />
      </PrivateRoute>
    ),
    children: [
      // Admin Dashboard routes
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

      // Teacher Dashboard routes
      {
        path: "teacher",
        element: <TeacherDashboardLayout />,
        children: [
          { index: true, element: <MyClass /> },
          { path: "add-class", element: <AddClass /> },
          { path: "my-class", element: <MyClasses /> },
          { path: "my-classes/:id", element: <TeacherClassDetails /> },
          { path: "profile", element: <TeacherProfile /> },
          { path: "teach", element: <TeacherRequestForm /> },
        ],
      },

      // Student Dashboard routes
      {
        path: "student",
        element: <StudentDashboardLayout />,
        children: [
          { index: true, element: <MyEnrolledClasses /> },
          { path: "my-classes", element: <MyEnrolledClasses /> },
          { path: "my-classes/:id", element: <MyEnrolledClassDetails /> },
          { path: "orders", element: <Orders /> },
          { path: "profile", element: <StudentProfile /> },

          // Payment route with Stripe Elements and PrivateRoute
          {
            path: "payment/:id",
            element: (
              <Elements stripe={stripePromise}>
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              </Elements>
            ),
          },

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
