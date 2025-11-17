import React from "react";
import { motion } from "framer-motion";

const instructors = [
  {
    name: "Ms. Iffat Zarin",
    subject: "Power System",
    image: "https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg",
  },
  {
    name: "Dr. Abul Munjer",
    subject: "Electronic Circuit",
    image: "https://i.ibb.co/1tnFJtDN/istockphoto-2160439329-2048x2048.jpg",
  },
  {
    name: "Zarin Khan",
    subject: "Mathematics",
    image: "https://i.ibb.co/mrM39XM4/businesswoman-posing-23-2148142829.jpg",
  },
];

const TopInstructors = () => {
  return (
    <section className="py-16">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          ⭐ Top Instructors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {instructors.map((inst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.3 }}
              className="
                group
                backdrop-blur-md
                border border-gray-200/70 dark:border-gray-700
                rounded-3xl
                p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-500
              "
            >
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-pink-500 p-[3px]">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {inst.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{inst.subject}</p>

              <span className="
                inline-block mt-4 px-4 py-1
                text-sm font-semibold
                bg-blue-400/20
                text-blue-700 dark:text-blue-300
                rounded-full
              ">
                ⭐ Featured Instructor
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;
