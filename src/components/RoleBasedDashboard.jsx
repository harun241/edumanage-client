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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="bg-gray-100 dark:bg-gray-800 shadow-md transition-colors duration-500
                        w-full md:w-64 flex-shrink-0
                        min-h-[60vh] md:min-h-screen
                        overflow-auto
                        ">
        {renderSidebar()}
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6 bg-white dark:bg-gray-900 transition-colors duration-500 text-gray-900 dark:text-gray-100 min-h-[60vh] md:min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RoleBasedDashboard;
