import React from "react";
import useAuth from "../../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();

  const role = user?.role || "student";
  const phone = user?.phone || "+880123456789";

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Image */}
        <div>
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User Avatar"}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-600"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Name:</h2>
            <p>{user?.displayName || "No name found"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Role:</h2>
            <p>{role}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Email:</h2>
            <p>{user?.email || "No email found"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Phone:</h2>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
