import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';


const categories = [
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Data Science",
  "Cybersecurity",
];

const experiences = ["beginner", "mid-level", "experienced"];

const TeacherRequestForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    experience: '',
    title: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage('⚠️ Please login first to send a request.');
      return;
    }

    // Simple validation
    if (
      !formData.name.trim() ||
      !formData.experience ||
      !formData.title.trim() ||
      !formData.category
    ) {
      setMessage('⚠️ Please fill all required fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post(
        'http://localhost:3000/api/users/request-teacher',
        {
          name: formData.name,
          experience: formData.experience,
          title: formData.title,
          category: formData.category,
        },
        {
          headers: {
            'x-user-email': user.email,
            'x-user-role': user.role || 'student',
          },
        }
      );

      setMessage('✅ Your request has been sent. Please wait for admin approval.');
      // Optionally clear form or disable
    } catch (error) {
      console.error('Request Error:', error);
      const errMsg = error?.response?.data?.error || '❌ Failed to send request. Try again later.';
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Request to Become a Teacher
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Experience Level</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
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
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase().replace(/\s/g, '-')}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? 'Sending Request...' : 'Send Request'}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith('✅')
                ? 'text-green-600'
                : message.startsWith('⚠️')
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default TeacherRequestForm;
