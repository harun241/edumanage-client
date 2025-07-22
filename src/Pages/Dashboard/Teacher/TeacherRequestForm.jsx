import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";

const categories = [
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Data Science",
  "Cybersecurity",
];

const experiences = ["beginner", "mid-level", "experienced"];

const API_BASE = "https://edumanage-server-rho.vercel.app";

const TeacherRequestForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    experience: "",
    title: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const mutation = useMutation(
    () =>
      axios.post(
        `${API_BASE}/api/users/request-teacher`,
        {
          name: formData.name,
          experience: formData.experience,
          title: formData.title,
          category: formData.category,
        },
        {
          headers: {
            "x-user-email": user.email,
            "x-user-role": user.role || "student",
          },
        }
      ),
    {
      onSuccess: () => {
        setMessage("✅ Your request has been sent. Please wait for admin approval.");
      },
      onError: (error) => {
        console.error("Request Error:", error);
        const errMsg =
          error?.response?.data?.error || "❌ Failed to send request. Try again later.";
        setMessage(errMsg);
      },
    }
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage("⚠️ Please login first to send a request.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.experience ||
      !formData.title.trim() ||
      !formData.category
    ) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    setMessage("");
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        Request to Become a Teacher
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 transition-colors duration-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 transition-colors duration-300"
          >
            <option value="">Select experience</option>
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp.charAt(0).toUpperCase() + exp.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 transition-colors duration-300"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 transition-colors duration-300"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase().replace(/\s/g, "-")}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
        >
          {mutation.isLoading ? "Sending Request..." : "Send Request"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("✅")
                ? "text-green-600 dark:text-green-400"
                : message.startsWith("⚠️")
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            } transition-colors duration-300`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default TeacherRequestForm;
