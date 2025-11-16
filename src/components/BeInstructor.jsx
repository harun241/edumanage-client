import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const BeInstructor = () => {
  return (
    <div className="min-h-screen   px-6 md:px-10 py-16 flex items-center transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Animated Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src="https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg"
            alt="Instructor"
            className="w-full max-w-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:max-w-xl text-center lg:text-left"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold mb-5 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
          >
            Be An Instructor
          </motion.h1>

          <p className="py-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Instructory is Bangladesh’s top online teaching marketplace.  
            Share your skills, build an audience, and earn money through high-quality online courses.
          </p>

          {/* Animated Button */}
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
            <Link to={"/dashboard/student/teach"}>
              <button className="mt-4 px-6 py-3 text-lg font-semibold rounded-xl 
                bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-lg 
                hover:shadow-blue-400/50 transition-all duration-300">
                Start Teaching Today
              </button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default BeInstructor;
