import React, { useEffect, useState } from "react";

const WebStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    totalEnrollments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-12">
      {/* Left side: Stats cards */}
      <div className="space-y-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold">👥 Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold">📚 Total Classes</h3>
          <p className="text-3xl font-bold">{stats.totalClasses}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold">✅ Total Enrollments</h3>
          <p className="text-3xl font-bold">{stats.totalEnrollments}</p>
        </div>
      </div>

      {/* Right side: Image */}
      <div>
        <img
          src="https://i.ibb.co/sdrsHVkq/istockphoto-2060908783-2048x2048.jpg"
          alt="Website stats"
          className="w-full max-h-[350px] object-cover rounded-xl shadow"
        />
      </div>
    </div>
  );
};

export default WebStats;
