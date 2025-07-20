import React from 'react';

const instructors = [
  {
    name: "Ms. Iffat Zarin",
    subject: "Power system",
    image: "https://i.ibb.co/GQ2wW1FP/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands-197531-343.jpg",
  },
  {
    name: "Dr. Abul Munjer",
    subject: "Electronic circuit",
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
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Top Instructors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {instructors.map((instructor, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{instructor.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{instructor.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;
