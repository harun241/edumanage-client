import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => (
  <nav aria-label="Admin dashboard sidebar" className="p-4">
    <ul className="flex flex-col space-y-3">
      <li>
        <NavLink
          to="/dashboard/admin/all-classes"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/admin/teacher-requests"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Teacher Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/admin/profile"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AdminSidebar;
