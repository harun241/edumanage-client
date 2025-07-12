import React from "react";
import useAuth from "../../../hooks/useAuth";
import { FaEnvelope, FaPhoneAlt, FaUserCircle, FaUserTag } from "react-icons/fa";

const StudentProfile = () => {
  const { user } = useAuth();

  const role = user?.role || "Student";
  const phone = user?.phone || "+880123456789";

  return (
    <div className="max-w-3xl mx-auto mt-20 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 ring-1 ring-blue-200">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
          My Profile
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Profile Image */}
          <div className="relative group">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt={user?.displayName || "User Avatar"}
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-md transform group-hover:scale-105 transition"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-5 text-gray-800">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-blue-600 text-xl" />
              <div>
                <h2 className="font-semibold text-lg">Name</h2>
                <p>{user?.displayName || "No name found"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaUserTag className="text-blue-600 text-xl" />
              <div>
                <h2 className="font-semibold text-lg">Role</h2>
                <p>{role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 text-xl" />
              <div>
                <h2 className="font-semibold text-lg">Email</h2>
                <p>{user?.email || "No email found"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-600 text-xl" />
              <div>
                <h2 className="font-semibold text-lg">Phone</h2>
                <p>{phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
