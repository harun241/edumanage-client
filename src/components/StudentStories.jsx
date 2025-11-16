import React from "react";
import Tilt from "react-parallax-tilt";

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
    <section className="py-20">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-gray-900 dark:text-white tracking-wide">
          🌟 Student Success Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((student, i) => (
            <Tilt
              key={i}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.03}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="white"
              glarePosition="all"
            >
              <div className="
                p-6 rounded-2xl
                backdrop-blur-lg bg-white/10 dark:bg-gray-800/30
                border border-white/20 dark:border-gray-700/20
                shadow-xl hover:shadow-blue-400/30
                transition-all duration-500
                hover:-translate-y-2
                flex flex-col items-start
              ">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                  />
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {student.name}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {student.story}
                </p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentStories;
