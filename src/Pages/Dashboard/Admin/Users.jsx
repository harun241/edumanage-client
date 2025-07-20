import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../components/Loader';

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

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-600 dark:text-red-400">{error}</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        All Users
      </h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center text-center text-gray-900 dark:text-gray-100"
            >
              <img
                src={user.photo || 'https://via.placeholder.com/100'}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{user.name || 'No Name'}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
              <span
                className={`inline-block px-3 rounded-full text-sm font-medium
                  ${
                    user.role === 'admin'
                      ? 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'
                      : user.role === 'teacher'
                      ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                      : 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
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
