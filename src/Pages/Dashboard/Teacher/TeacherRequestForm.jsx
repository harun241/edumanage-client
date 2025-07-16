import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';

const TeacherRequestForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage('⚠️ Please login first to send a request.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Send request to backend with required headers
      await axios.post(
        'http://localhost:3000/api/users/request-teacher',
        {}, // No body needed
        {
          headers: {
            'x-user-email': user.email,
            'x-user-role': 'student', // Send current role or 'student' if default
          },
        }
      );

      setMessage('✅ Your request has been sent. Please wait for admin approval.');
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
          <label className="block text-sm font-medium text-gray-700">
            Logged in as:
          </label>
          <p className="text-gray-900 font-semibold mt-1">
            {user?.email || 'Not logged in'}
          </p>
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
            className={`mt-4 text-sm ${
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
