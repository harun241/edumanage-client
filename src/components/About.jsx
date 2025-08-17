// src/pages/About.jsx
import React from "react";
import { Link } from "react-router";


const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-400 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About EduManage
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            EduManage is a modern platform for managing classes, teachers, and students efficiently.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Who We Are</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center mb-6">
          EduManage is designed to simplify education management for students, teachers, and admins. Our platform offers class management, enrollment tracking, real-time dashboards, and intuitive interfaces to help educators and learners thrive in a seamless digital environment.
        </p>
        <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center">
          Whether you are a student looking to enroll in new courses, a teacher managing your classes, or an admin overseeing the platform, EduManage provides all the tools you need in one centralized hub.
        </p>
      </section>

      {/* Team / Contributors */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Harun", role: "Full Stack Developer" },
            { name: "Iffat", role: "UI/UX Designer" },
            { name: "Zarin", role: "Backend Developer" },
            { name: "Sadia", role: "Frontend Developer" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center hover:scale-105 transform transition"
            >
              <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-500 text-white text-center rounded-t-3xl">
        <h2 className="text-3xl font-semibold mb-4">Join EduManage Today</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Sign up to explore classes, manage your courses, and be part of our growing education community.
        </p>
        <Link
          to="/auth/register" // ✅ Use Link instead of <a>
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default About;
