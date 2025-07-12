import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import getUserRole from "../utils/getUserRole";

const MainDashboardLayout = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      getUserRole(user.email).then(res => {
        setRole(res);
        setRoleLoading(false);
      });
    } else {
      setRoleLoading(false);
    }
  }, [user]);

  if (loading || roleLoading) return <div className="p-10">Loading...</div>;
  if (!user || !role) return <Navigate to="/auth/login" state={{ from: location }} replace />;

  // 🔥 Role-based Sidebar Menu
  const renderSidebar = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <li><a href="/dashboard/all-classes">All Classes</a></li>
            <li><a href="/dashboard/users">Manage Users</a></li>
            <li><a href="/dashboard/teacher-requests">Teacher Requests</a></li>
            <li><a href="/dashboard/profile">My Profile</a></li>
          </>
        );
      case "teacher":
        return (
          <>
            <li><a href="/dashboard/add-class">Add Class</a></li>
            <li><a href="/dashboard/my-class">My Classes</a></li>
            <li><a href="/dashboard/profile">My Profile</a></li>
          </>
        );
      case "student":
        return (
          <>
            <li><a href="/dashboard/my-classes">My Enrolled Classes</a></li>
            <li><a href="/dashboard/orders">Orders</a></li>
            <li><a href="/dashboard/profile">My Profile</a></li>
          </>
        );
      default:
        return <li>No Access</li>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 p-6 shadow">
        <h2 className="text-xl font-bold mb-6 capitalize">{role} Dashboard</h2>
        <ul className="space-y-2">{renderSidebar()}</ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default MainDashboardLayout;
