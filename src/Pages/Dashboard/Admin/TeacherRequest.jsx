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
        const res = await axios.get('http://localhost:3000/api/users/teacher-requests', {
          headers: {
            'x-user-email': 'admin@example.com', // Replace with dynamic email from context if available
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
      await axios.patch(`http://localhost:3000/api/users/approve-teacher/${email}`, {}, {
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
      await axios.patch(`http://localhost:3000/api/users/deny-teacher/${email}`, {}, {
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
  if (loading) return <Loader/>;

  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (requests.length === 0) return <p className="text-center text-gray-600 mt-10">No pending teacher requests.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pending Teacher Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map(({ _id, name, email }) => (
          <div
            key={_id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold text-gray-700 mb-2">👤 {name || 'No Name Provided'}</p>
            <p className="text-sm text-gray-600 mb-4">📧 {email}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(email)}
                className="   bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-md transition duration-200"
              >
                 Approve
              </button>
              <button
                onClick={() => handleDeny(email)}
                className=" bg-red-600 hover:bg-gray-500 text-white py-2  px-4 rounded-md transition duration-200"
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
