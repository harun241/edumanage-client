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
      setMessage('Please login first.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // API call to create a request
      await axios.post('http://localhost:3000/api/teacher-requests', {
        email: user.email,
        name: user.displayName || 'No Name',
      });

      setMessage('Your request has been sent. Please wait for admin approval.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send request. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Request to Become a Teacher</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-4">
          Logged in as: <strong>{user?.email || 'Not logged in'}</strong>
        </p>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default TeacherRequestForm;
