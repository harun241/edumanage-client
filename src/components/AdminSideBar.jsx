import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

// Capitalize utility
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const AdminSidebar = () => {
  const { user } = useAuth();

  const name = user?.displayName || "Admin User";
  const role = (user?.role || "Admin");

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard/admin/all-classes", label: "All Classes" },
    { to: "/dashboard/admin/users", label: "Users" },
    { to: "/dashboard/admin/teacher-requests", label: "Teacher Requests" },
    { to: "/dashboard/admin/profile", label: "Profile" },
  ];

  return (
    <nav aria-label="Admin dashboard sidebar">
      <ul className="space-y-6 bg-gray-800 min-h-screen p-6 text-white">
        {/* Profile Section */}
        <li className="flex flex-col items-center border-b border-white pb-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Admin"
              className="w-20 h-20 rounded-full border-2 border-white object-cover mb-4"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-white mb-4" />
          )}
          <p className="font-semibold text-lg text-center">{name}</p>
          <p className="text-sm text-white/80 text-center">{role}</p>
        </li>

        {/* Navigation Links */}
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block w-full border-b-2 pb-2 px-2 transition-all duration-300 transform ${
                  isActive
                    ? "text-yellow-300 font-semibold border-yellow-300"
                    : "border-transparent hover:border-yellow-200 hover:translate-x-1"
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
