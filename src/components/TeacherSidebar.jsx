import { NavLink } from "react-router-dom";

const TeacherSidebar = () => (
  <nav aria-label="Teacher dashboard sidebar">
    <ul className="space-y-3">
      <li>
        <NavLink
          to="/dashboard/teacher/add-class"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors duration-200"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Add Class
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/teacher/my-class"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors duration-200"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          My Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/teacher/profile"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition-colors duration-200"
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default TeacherSidebar;
