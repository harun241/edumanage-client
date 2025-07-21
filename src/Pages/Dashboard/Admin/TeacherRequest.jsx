import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../components/Loader';

const TeacherRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all teacher requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://edumanage-server-rho.vercel.app/api/users/teacher-requests', {
          headers: {
            'x-user-email': 'admin@example.com', // Replace dynamically if needed
            'x-user-role': 'admin',
          },
        });
        setRequests(res.data);
      } catch (err) {
        setError('❌ Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Approve teacher request
  const handleApprove = async (email) => {
    try {
      await axios.patch(`http://edumanage-server-rho.vercel.app/api/users/approve-teacher/${email}`, {}, {
        headers: {
          'x-user-email': 'admin@example.com',
          'x-user-role': 'admin',
        },
      });
      setRequests((prev) => prev.filter((r) => r.email !== email));
    } catch {
      alert('❌ Approve failed');
    }
  };

  // Deny teacher request
  const handleDeny = async (email) => {
    try {
      await axios.patch(`http://ledumanage-server-rho.vercel.app/api/users/deny-teacher/${email}`, {}, {
        headers: {
          'x-user-email': 'admin@example.com',
          'x-user-role': 'admin',
        },
      });
      setRequests((prev) => prev.filter((r) => r.email !== email));
    } catch {
      alert('❌ Deny failed');
    }
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-600 mt-10 dark:text-red-400 transition-colors duration-300">
        {error}
      </p>
    );
  if (requests.length === 0)
    return (
      <p className="text-center text-gray-600 mt-10 dark:text-gray-400 transition-colors duration-300">
        No pending teacher requests.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        Pending Teacher Requests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map(({ _id, name, email }) => (
          <div
            key={_id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
          >
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
              👤 {name || 'No Name Provided'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
              📧 {email}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(email)}
                className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-md transition duration-200"
              >
                Approve
              </button>
              <button
                onClick={() => handleDeny(email)}
                className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md transition duration-200"
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherRequest;
