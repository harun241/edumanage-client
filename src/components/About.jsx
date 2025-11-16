// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom"; // corrected import

const teamMembers = [
  { name: "Harun", role: "Full Stack Developer" },
  { name: "Iffat", role: "UI/UX Designer" },
  { name: "Zarin", role: "Backend Developer" },
  { name: "Sadia", role: "Frontend Developer" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Back Button */}
      <div className="my-6 px-4 max-w-7xl mx-auto">
        <Link to="/">
          <button className="btn bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-5 py-2 transition">
            ← Back To Home
          </button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className=" py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About EduManage
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            EduManage is a modern platform for managing classes, teachers, and students efficiently.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">Who We Are</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center mb-6 leading-relaxed">
          EduManage is designed to simplify education management for students, teachers, and admins. 
          Our platform offers class management, enrollment tracking, real-time dashboards, and intuitive 
          interfaces to help educators and learners thrive in a seamless digital environment.
        </p>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
          Whether you are a student looking to enroll in new courses, a teacher managing your classes, 
          or an admin overseeing the platform, EduManage provides all the tools you need in one centralized hub.
        </p>
      </section>

      {/* Team / Contributors */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform transition hover:scale-105 hover:shadow-xl"
            >
              <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4  text-white text-center rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Join EduManage Today</h2>
        <p className="mb-8 max-w-3xl mx-auto leading-relaxed">
          Sign up to explore classes, manage your courses, and be part of our growing education community.
        </p>
        <Link
          to="/auth/register"
          className="px-8 py-3 bg-white text-sky-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default About;
