import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "https://edumanage-server-rho.vercel.app";

const categories = [
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Data Science",
  "Cybersecurity",
];

const experienceLevels = ["Beginner", "Mid-level", "Experienced"];

const fetchTeacherStatus = async (email, role) => {
  const res = await axios.get(`${API_BASE}/api/teacher-request/status?email=${email}`, {
    headers: {
      "x-user-email": email,
      "x-user-role": role || "student",
    },
  });
  return res.data.status; // expected: "pending", "approved", "rejected", or null
};

const submitTeacherRequest = async ({ formData, email, role }) => {
  const payload = {
    ...formData,
    email,
    status: "pending",
  };
  const res = await axios.post(`${API_BASE}/api/teacher-request`, payload, {
    headers: {
      "x-user-email": email,
      "x-user-role": role || "student",
    },
  });
  return res.data;
};

const resetRequestStatus = async ({ email, role }) => {
  const res = await axios.patch(
    `${API_BASE}/api/teacher-request`,
    { email, status: "pending" },
    {
      headers: {
        "x-user-email": email,
        "x-user-role": role || "student",
      },
    }
  );
  return res.data;
};

const TeachOnEdumanage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    experience: "",
    title: "",
    category: "",
    image: user?.photoURL || "",
  });

  // Fetch status using react-query
  const {
    data: status,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["teacherStatus", user?.email],
    () => fetchTeacherStatus(user.email, user.role),
    {
      enabled: !!user?.email,
    }
  );

  // Mutation for submitting teacher request
  const submitMutation = useMutation(
    () => submitTeacherRequest({ formData, email: user.email, role: user.role }),
    {
      onSuccess: () => {
        alert("Your request has been submitted for review.");
        queryClient.invalidateQueries(["teacherStatus"]);
      },
      onError: (err) => {
        alert("Failed to submit request.");
        console.error(err);
      },
    }
  );

  // Mutation for resetting request status
  const resetMutation = useMutation(
    () => resetRequestStatus({ email: user.email, role: user.role }),
    {
      onSuccess: () => {
        alert("Your request status has been reset to pending.");
        queryClient.invalidateQueries(["teacherStatus"]);
      },
      onError: (err) => {
        alert("Failed to reset request status.");
        console.error(err);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.experience || !formData.title || !formData.category) {
      alert("Please fill all required fields");
      return;
    }

    submitMutation.mutate();
  };

  const handleRequestAnother = () => {
    resetMutation.mutate();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>Error loading status: {error.message || "Something went wrong"}</p>;

  if (status === "approved")
    return <p className="max-w-md mx-auto p-6 text-center">You are already approved as a teacher. Thank you!</p>;

  if (status === "rejected")
    return (
      <div className="max-w-md mx-auto p-6 border rounded shadow text-center">
        <p>Your teacher request was rejected.</p>
        <button
          onClick={handleRequestAnother}
          disabled={resetMutation.isLoading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {resetMutation.isLoading ? "Submitting..." : "Request to Another"}
        </button>
      </div>
    );

  // status is pending or null (no request yet)
  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Apply to Teach on EduManage</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">Your Image</label>
        <img
          src={formData.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />

        <label className="block mb-2 font-medium">Email (read-only)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded mb-4 bg-gray-100 cursor-not-allowed"
        />

        <label className="block mb-2 font-medium">Experience Level</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select experience</option>
          {experienceLevels.map((exp) => (
            <option key={exp} value={exp.toLowerCase()}>
              {exp}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Frontend Developer"
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase().replace(/\s/g, "-")}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={submitMutation.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full"
        >
          {submitMutation.isLoading ? "Submitting..." : "Submit for Review"}
        </button>
      </form>
    </div>
  );
};

export default TeachOnEdumanage;
