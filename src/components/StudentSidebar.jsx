// src/components/StudentSidebar.jsx
import { NavLink } from "react-router-dom";

const StudentSidebar = () => (
  <nav>
    <ul className="space-y-3">
      <li>
        <NavLink
          to="/dashboard/student/my-classes"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          My Enrolled Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/student/orders"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Orders
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/student/profile"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default StudentSidebar;
