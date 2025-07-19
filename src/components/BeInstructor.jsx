import React from 'react';

const BeInstructor = () => {
  return (
    <div className="hero bg-base-200 min-h-screen px-4 md:px-8">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start max-w-7xl mx-auto">
        <img
          src="https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg"
          alt="Instructor"
          className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-2xl mb-8 lg:mb-0 mx-auto"
        />
        <div className="lg:max-w-xl text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4">Be An Instructor</h1>
          <p className="py-4 text-lg leading-relaxed text-gray-700">
            Instructory is the online teaching marketplace in Bangladesh to earn money.
            It is the best E-Learning platform to learn online courses from the top instructors.
          </p>
          <button className="btn btn-primary mt-4">Start Teaching Today</button>
        </div>
      </div>
    </div>
  );
};

export default BeInstructor;
