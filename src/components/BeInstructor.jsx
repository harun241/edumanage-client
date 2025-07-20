import React from 'react';
import { Link } from 'react-router';

const BeInstructor = () => {
  return (
    <div className="hero min-h-screen px-4 md:px-8 bg-base-200 dark:bg-gray-900 transition-colors duration-500">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start max-w-7xl mx-auto">
        <img
          src="https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg"
          alt="Instructor"
          className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-2xl mb-8 lg:mb-0 mx-auto"
        />
        <div className="lg:max-w-xl text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-500">
            Be An Instructor
          </h1>
          <p className="py-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
            Instructory is the online teaching marketplace in Bangladesh to earn money.
            It is the best E-Learning platform to learn online courses from the top instructors.
          </p>
          <Link to={'/dashboard/student/teach'}>
            <button className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300">
              Start Teaching Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeInstructor;
