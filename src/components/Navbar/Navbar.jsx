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

  const baseLinkStyle =
    "block w-full border-b-2 pb-2 px-2 transition-all duration-300 transform";
  const activeStyle = "text-blue-500 font-semibold border-blue-400";
  const inactiveStyle =
    "border-transparent hover:border-gray-300 hover:translate-x-1 text-gray-700 dark:text-gray-100";

  const userNavItems = [
    { to: "/", label: "Home" },
    { to: "/all-classes", label: "All Classes" },
    ...(user?.role === "student"
      ? [{ to: "/dashboard/student/teach", label: "Teach on EduManage" }]
      : []),
    { to: getDashboardPath(), label: "Dashboard" },
  ];

  const adminNavItems = [
    { to: "/dashboard/admin/all-classes", label: "All Classes (Admin)" },
    { to: "/dashboard/admin", label: "Dashboard" },
  ];

  const renderLinks = (items) =>
    items.map(({ to, label }) => (
      <li key={to}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${baseLinkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          {label}
        </NavLink>
      </li>
    ));

  return (
    <nav className="w-full bg-sky-400 dark:bg-gray-900 shadow-sm fixed top-0 left-0 z-50 transition-colors">
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
            {user?.role === "admin"
              ? renderLinks(adminNavItems)
              : renderLinks(userNavItems)}
          </ul>

          {/* Right - Auth/Profile */}
          <div
            className="flex items-center space-x-4 relative"
            ref={profileRef}
          >
            {!user ? (
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "Avatar"}
                  className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer hover:scale-105 transition"
                  onClick={() => {
                    setProfileDropdownOpen((prev) => {
                      if (!prev) setMobileMenuOpen(false);
                      return !prev;
                    });
                  }}
                />

                {/* Dropdown */}
                <div
                  className={`absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 transition-all duration-200 origin-top-right transform
                    ${
                      profileDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                    w-72 right-0 mt-2
                  `}
                >
                  <div className="px-4 py-4 space-y-3 text-gray-700 dark:text-gray-100">
                    <div className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-600 pb-3">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.displayName || "User"}
                        className="w-14 h-14 rounded-full border border-blue-500"
                      />
                      <div>
                        <p className="font-semibold text-lg">
                          {user.displayName || "No Name"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {user.role || "student"}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {user.phone || "+880123456789"}
                      </p>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <NavLink
                        to={getDashboardPath()}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to={`${getDashboardPath()}/profile`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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
              onClick={() => {
                setMobileMenuOpen((prev) => {
                  if (!prev) setProfileDropdownOpen(false);
                  return !prev;
                });
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-md px-4 pb-4 pt-2 z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 max-h-screen ease-out"
            : "opacity-0 max-h-0 ease-in overflow-hidden pointer-events-none"
        }`}
      >
        <ul className="space-y-2 list-none">
          {user?.role === "admin"
            ? renderLinks(adminNavItems)
            : renderLinks(userNavItems)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
