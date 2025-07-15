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
          to="/dashboard/student/profile"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : "hover:text-primary"
          }
        >
          Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/student/teacher-request"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors duration-200"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Teacher-Request-form
        </NavLink>

        
      </li>
    </ul>
  </nav>
);

export default StudentSidebar;
