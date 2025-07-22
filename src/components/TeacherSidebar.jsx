import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

// Capitalize utility function
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const TeacherSidebar = () => {
  const { user } = useAuth();

  const name = user?.displayName || "Anonymous";
  const role = capitalize(user?.role || "Teacher");

  return (
    <nav aria-label="Teacher dashboard sidebar">
      <ul className="space-y-3 bg-gray-800 h-full min-h-screen p-4 text-white">
        {/* Profile Section */}
        <li className="mb-6 flex flex-col items-center border-b border-white pb-4">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User"
              className="w-20 h-20 rounded-full border-2 border-white object-cover mb-3"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-white mb-3" />
          )}
          <p className="font-semibold text-center">{name}</p>
          <p className="text-sm text-white/80 text-center">{role}</p>
        </li>

        {/* Sidebar Links */}
        {[
          { to: "/", label: "Home" },
          { to: "/dashboard/teacher/my-class", label: "My Classes" },
          { to: "/dashboard/teacher/add-class", label: "Add Class" },
          { to: "/dashboard/teacher/profile", label: "Profile" },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block w-full border-b-2 pb-1 px-2 transition-all duration-300 transform ${
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

export default TeacherSidebar;
