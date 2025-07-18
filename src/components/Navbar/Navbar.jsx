import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import EduManage from "../Edumanage";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef();

  const handleLogout = () => {
    logOut()
      .then(() => setProfileDropdownOpen(false))
      .catch((error) => console.error("Logout error:", error));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDashboardPath = () => {
    if (user?.role === "admin") return "/dashboard/admin";
    if (user?.role === "teacher") return "/dashboard/teacher";
    if (user?.role === "student") return "/dashboard/student";
    return "/dashboard";
  };

  const userNavItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-classes"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          All Classes
        </NavLink>
      </li>
 {user?.role === "student" && (
  <li>
    <NavLink
      to="/dashboard/student/teach"
      className={({ isActive }) =>
        isActive ? "text-blue-600 font-semibold" : "text-gray-700"
      }
      onClick={() => setMobileMenuOpen(false)}
    >
      Teach on EduManage
    </NavLink>
  </li>
)}

      <li>
        <NavLink
          to={getDashboardPath()}
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const adminNavItems = (
    <>
      <li>
        <NavLink
          to="/dashboard/admin/all-classes"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          All Classes (Admin)
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <EduManage />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 list-none">
            {user?.role === "admin" ? adminNavItems : userNavItems}
          </ul>

          {/* Right Side - Profile */}
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            {!user ? (
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || user.email}
                  className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  title={user.displayName || user.email}
                />

                {/* Dropdown with animation */}
                <div
                  className={`absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50 transition-all duration-300 origin-top-right transform ${
                    profileDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-4 space-y-3 text-gray-700">
                    <div className="flex items-center space-x-4 border-b pb-3">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.displayName || "User Avatar"}
                        className="w-14 h-14 rounded-full border border-blue-600"
                      />
                      <div>
                        <p className="font-semibold text-lg">
                          {user.displayName || "No Name"}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {user.role || "student"}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Phone:</strong> {user.phone || "+880123456789"}</p>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <NavLink
                        to={getDashboardPath()}
                        className="block px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to={`${getDashboardPath()}/profile`}
                        className="block px-4 py-2 hover:bg-gray-100 rounded"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 pt-2">
          <ul className="space-y-2 list-none">
            {user?.role === "admin" ? adminNavItems : userNavItems}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
