import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
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

  // সাধারণ ইউজারের ন্যাভ আইটেমস
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
          to="/allclasses"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teach"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Teach on EduManage
        </NavLink>
      </li>
    </>
  );

  // Admin এর ন্যাভ আইটেমস (অতিরিক্ত)
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
      {/* আপনি চাইলে অন্য Admin লিংকগুলোও এখানে যোগ করতে পারেন */}
    </>
  );

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <EduManage />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 list-none">
            {user?.role === "admin" ? (
              <>
                {adminNavItems}
                {/* যদি চান, এখানে userNavItems ও দেখাতে পারেন */}
              </>
            ) : (
              userNavItems
            )}
          </ul>

          {/* Right Side (Profile or Login) */}
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            {!user ? (
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Sign In
              </Link>
            ) : (
              <>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  title={user.displayName || user.email}
                />
                {profileDropdownOpen && (
                  <ul className="absolute right-0 top-14 w-48 bg-white border rounded shadow-md py-2 space-y-1 text-gray-700 z-50">
                    <li className="px-4 py-2 font-semibold border-b text-center select-none">
                      {user.displayName || user.email}
                    </li>

                    {/* Dashboard submenu */}
                    <li className="relative group">
                      <span className="block px-4 py-2 cursor-pointer hover:bg-gray-100 font-semibold">
                        Dashboard ▾
                      </span>
                      <ul className="absolute left-full top-0 hidden group-hover:block bg-white border rounded shadow-md w-44 py-2 space-y-1 text-gray-700 z-50">
                        <li>
                          <NavLink
                            to="/dashboard/add-class"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            Add Class
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dashboard/my-class"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            My Class
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/dashboard/profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            Profile
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Hamburger for Mobile */}
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

      {/* Mobile Menu */}
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
