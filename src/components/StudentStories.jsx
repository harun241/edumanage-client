import React from 'react';

const stories = [
  {
    name: "Arif Rahman",
    story: "Thanks to EduManage, I improved my grades and secured a full scholarship abroad.",
    photo: "https://i.ibb.co/PZM4NMtc/image.png",
  },
  {
    name: "Sadia Anjum",
    story: "The platform helped me master JavaScript and land a job as a junior developer.",
    photo: "https://i.ibb.co/Vctt7YYp/image.png",
  },
  {
    name: "Mahmudul Hasan",
    story: "EduManage's interactive classes and assignments made it easy for me to learn even during lockdown.",
    photo: "https://i.ibb.co/PZM4NMtc/image.png",
  },
  {
    name: "Tanjina Sultana",
    story: "I loved the personalized feedback from instructors. It felt like they truly cared about my progress.",
    photo: "https://i.ibb.co/Q3RQNr0v/image.png",
  },
  {
    name: "Shafa",
    story: "Joining EduManage was a turning point — I discovered my interest in Data Science and built real projects.",
    photo: "https://i.ibb.co/p6XkWf5m/image.png",
  },
  {
    name: "Farzana Nahar",
    story: "The platform’s flexible learning schedule allowed me to balance my studies with a part-time job.",
    photo: "https://i.ibb.co/p6XkWf5m/image.png",
  },
];

const StudentStories = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
          Student Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stories.map((student, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 text-left bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={student.photo}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {student.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {student.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentStories;
