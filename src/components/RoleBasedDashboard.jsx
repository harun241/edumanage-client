import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AdminSidebar from "./AdminSidebar";
import TeacherSidebar from "./TeacherSidebar";
import StudentSidebar from "./StudentSidebar";
import Loader from "./Loader";

const RoleBasedDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && location.pathname === "/dashboard") {
      if (user?.role === "admin") {
        navigate("/dashboard/admin/all-classes", { replace: true });
      } else if (user?.role === "teacher") {
        navigate("/dashboard/teacher/my-class", { replace: true });
      } else {
        navigate("/dashboard/student/my-classes", { replace: true });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  const renderSidebar = () => {
    if (user?.role === "admin") return <AdminSidebar />;
    if (user?.role === "teacher") return <TeacherSidebar />;
    return <StudentSidebar />;
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen grid grid-cols-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <aside className="col-span-12 md:col-span-3 bg-gray-100 dark:bg-gray-800 p-4 shadow-md min-h-screen transition-colors duration-500">
        {renderSidebar()}
      </aside>
      <main className="col-span-12 md:col-span-9 p-6 bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default RoleBasedDashboard;
