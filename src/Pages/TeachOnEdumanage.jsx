import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"; // Your auth hook/context
import axios from "axios";

const categories = [
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Data Science",
  "Cybersecurity",
];

const experienceLevels = ["Beginner", "Mid-level", "Experienced"];

const TeachOnEdumanage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    experience: "",
    title: "",
    category: "",
  });
  const [status, setStatus] = useState(null); // pending, approved, rejected, or null
  const [loading, setLoading] = useState(true);

  // Fetch current teacher request status for this user
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/teacher-request/status?email=${user.email}`)
        .then((res) => {
          setStatus(res.data.status); // "pending", "approved", "rejected", or null
          setLoading(false);
        })
        .catch(() => {
          setStatus(null);
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.experience ||
      !formData.title ||
      !formData.category
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        ...formData,
        email: user.email,
        image: user.photoURL || "", // user's profile image
        status: "pending",
      };
      await axios.post("/api/teacher-request", payload);
      alert("Your request has been submitted for review.");
      setStatus("pending");
    } catch (err) {
      alert("Failed to submit request.");
      console.error(err);
    }
  };

  const handleRequestAnother = async () => {
    try {
      await axios.patch("/api/teacher-request", {
        email: user.email,
        status: "pending",
      });
      alert("Your request status has been reset to pending.");
      setStatus("pending");
    } catch (err) {
      alert("Failed to reset request status.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (status === "approved")
    return <p>You are already approved as a teacher. Thank you!</p>;

  if (status === "rejected")
    return (
      <div>
        <p>Your teacher request was rejected.</p>
        <button onClick={handleRequestAnother}>Request to Another</button>
      </div>
    );

  // status is pending or null (no request yet) => show form
  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Apply to Teach on [Your Website]</h2>
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
          src={user?.photoURL || "https://via.placeholder.com/150"}
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit for Review
        </button>
      </form>
    </div>
  );
};

export default TeachOnEdumanage;
