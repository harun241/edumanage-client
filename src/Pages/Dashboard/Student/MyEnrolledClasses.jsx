import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyEnrolledClasses = () => {
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError(null);

        const enrollRes = await fetch('http://localhost:3000/enrollments', {
          headers: {
            'x-user-email': user.email,
            'x-user-role': user.role || '',
          },
        });

        if (!enrollRes.ok) {
          throw new Error(`Failed to fetch enrollments: ${enrollRes.statusText}`);
        }

        const enrollments = await enrollRes.json();

        if (!Array.isArray(enrollments) || enrollments.length === 0) {
          setEnrolledClasses([]);
          return;
        }

        const classesData = await Promise.all(
          enrollments.map(async (enroll) => {
            if (!enroll.classId) return null;

            const classRes = await fetch(`http://localhost:3000/classes/${enroll.classId}`, {
              headers: {
                'x-user-email': user.email,
                'x-user-role': user.role || '',
              },
            });

            if (!classRes.ok) {
              return {
                _id: enroll.classId,
                title: 'Class details not found',
                description: '',
                price: 'N/A',
                image: null,
                name: 'Unknown',
              };
            }

            return classRes.json();
          })
        );

        setEnrolledClasses(classesData.filter(Boolean));
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  if (loading) return <p className="text-center text-lg py-6">Loading enrolled classes...</p>;
  if (error) return <p className="text-center text-red-500 py-6">Error: {error}</p>;
  if (enrolledClasses.length === 0)
    return <p className="text-center py-6">You have not enrolled in any classes yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-8 text-blue-700">My Enrolled Classes</h2>
      <div className="grid gap-6">
        {enrolledClasses.map((cls) => (
          <div
            key={cls._id}
            className="flex bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-48 h-32 flex-shrink-0">
              {cls.image ? (
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{cls.title || 'Untitled Class'}</h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Instructor:</span> {cls.name || 'Unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  {cls.description || 'No description available.'}
                </p>
                <p className="text-blue-600 font-bold text-lg">
                  Price: {cls.price !== undefined ? `$${cls.price}` : 'N/A'}
                </p>
              </div>

              <div className="mt-4">
                <Link to={`/class/${cls._id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
                    Continue
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrolledClasses;
