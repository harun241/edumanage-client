import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/users');
        setUsers(res.data);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center text-center">
              <img
                src={user.photo || 'https://via.placeholder.com/100'}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{user.name || 'No Name'}</h3>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                  ${
                    user.role === 'admin'
                      ? 'bg-red-200 text-red-800'
                      : user.role === 'teacher'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-blue-200 text-blue-800'
                  }
                `}
              >
                {user.role || 'student'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
