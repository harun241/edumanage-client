import { Link, NavLink } from "react-router"; 
import { useState, useRef, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import EduManage from "../Edumanage";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logOut()
      .then(() => {
        setDropdownOpen(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = (
    <>
    
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allclasses">All Classes</NavLink>
      </li>
      <li>
        <NavLink to="/teach">Teach on EduManage</NavLink>
      </li>
    </>
  );

  return (
    <div>
      
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <EduManage></EduManage>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end space-x-4 flex items-center">
          {!user ? (
            <NavLink to="/auth/login" className="btn btn-sm bg-green-600 text-white">
              Sign In
            </NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title={user.displayName || user.email}
              />
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 p-2 space-y-2">
                  <li className="text-center font-semibold text-gray-700 border-b pb-2 select-none">
                    {user.displayName || user.email}
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
