import React from "react";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const role = user?.role; 

  if (!role) {
    return <p className="text-center mt-10">Loading role...</p>;
  }

  return (
    <div className="p-8 text-center">
      {role === "admin" && (
        <>
          <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, Admin! Here you can manage users and classes.</p>
        </>
      )}
      {role === "teacher" && (
        <>
          <h1 className="text-3xl font-bold text-green-600">Teacher Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, Teacher! You can manage your classes here.</p>
        </>
      )}
      {role === "student" && (
        <>
          <h1 className="text-3xl font-bold text-purple-600">Student Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, Student! View your enrolled classes and progress.</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
