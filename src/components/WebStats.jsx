import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const WebStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    totalEnrollments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://edumanage-server-rho.vercel.app/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 py-16">
      
      {/* Left side content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        {/* CARD 1 */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03}>
          <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-gray-800/30 
            shadow-xl border border-white/20 dark:border-gray-700/20 
            hover:shadow-blue-400/40 transition-all duration-300">
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              👥 Total Users
            </h3>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mt-3">
              <CountUp end={stats.totalUsers} duration={2} separator="," />
            </p>
          </div>
        </Tilt>

        {/* CARD 2 */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03}>
          <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-gray-800/30 
            shadow-xl border border-white/20 dark:border-gray-700/20 
            hover:shadow-green-400/40 transition-all duration-300">
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              📚 Total Classes
            </h3>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mt-3">
              <CountUp end={stats.totalClasses} duration={2} separator="," />
            </p>
          </div>
        </Tilt>

        {/* CARD 3 */}
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03}>
          <div className="p-8 rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-gray-800/30
            shadow-xl border border-white/20 dark:border-gray-700/20 
            hover:shadow-yellow-400/40 transition-all duration-300">
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              ✅ Total Enrollments
            </h3>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mt-3">
              <CountUp end={stats.totalEnrollments} duration={2} separator="," />
            </p>
          </div>
        </Tilt>
      </motion.div>

      {/* Right side image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src="https://i.ibb.co/sdrsHVkq/istockphoto-2060908783-2048x2048.jpg"
          alt="Website stats"
          className="w-full rounded-2xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default WebStats;
