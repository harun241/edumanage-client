import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all teacher requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Adjust baseURL if needed
        const res = await axios.get('http://localhost:3000/api/users/teacher-requests', {
          headers: {
            'x-user-email': 'admin@example.com',  // এখানে admin এর email দিন বা context থেকে নিন
            'x-user-role': 'admin',                // অবশ্যই admin role দিতে হবে
          }
        });
        setRequests(res.data);
      } catch (err) {
        setError('Failed to load requests');
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
        }
      });
      setRequests(prev => prev.filter(r => r.email !== email));
    } catch {
      alert('Approve failed');
    }
  };

  // Deny teacher request
  const handleDeny = async (email) => {
    try {
      await axios.patch(`http://localhost:3000/api/users/deny-teacher/${email}`, {}, {
        headers: {
          'x-user-email': 'admin@example.com',
          'x-user-role': 'admin',
        }
      });
      setRequests(prev => prev.filter(r => r.email !== email));
    } catch {
      alert('Deny failed');
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>{error}</p>;
  if (requests.length === 0) return <p>No pending teacher requests.</p>;

  return (
    <div>
      <h2>Teacher Requests</h2>
      <ul>
        {requests.map(({ _id, name, email }) => (
          <li key={_id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '0.5rem' }}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <button onClick={() => handleApprove(email)} style={{ marginRight: '1rem' }}>Approve</button>
            <button onClick={() => handleDeny(email)}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherRequest;
