import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/Loader';
import { Link } from 'react-router-dom';

const MyEnrolledClasses = () => {
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchEnrolledClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        // ইউজারের এনরোলমেন্টস নিয়ে আসা
        const enrollRes = await fetch(`http://edumanage-server-rho.vercel.app/enrollments`, {
          headers: {
            'x-user-email': user.email,
            'x-user-role': user.role || '',
          },
        });

        if (!enrollRes.ok) throw new Error('Failed to fetch enrollments');

        const enrollments = await enrollRes.json();

        if (enrollments.length === 0) {
          setEnrolledClasses([]);
          return;
        }

        // ইউনিক ক্লাস আইডি নেওয়া (ডুপ্লিকেট এড়াতে)
        const uniqueClassIds = [...new Set(enrollments.map(enroll => enroll.classId))];

        // একসাথে সব ক্লাস ডিটেইল নিয়ে আসা
        const classPromises = uniqueClassIds.map(id =>
          fetch(`http://edumanage-server-rho.vercel.app/classes/${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch class details');
            return res.json();
          })
        );

        const classes = await Promise.all(classPromises);

        setEnrolledClasses(classes);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, [user]);

  if (!user || loading) return <Loader />;

  if (error)
    return (
      <p className="text-center text-red-600 dark:text-red-400 py-6 transition-colors duration-300">
        {error}
      </p>
    );

  if (enrolledClasses.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 py-6 transition-colors duration-300">
        You have not enrolled in any class yet.
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white  rounded-lg transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white py-2 dark:bg-gray-700 transition-colors duration-300">
        My Enrolled Classes
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {enrolledClasses.map(cls => (
          <li
            key={cls._id}
            className="border border-gray-300 dark:border-gray-700 rounded-2xl p-4 shadow-sm dark:shadow-md hover:shadow-lg dark:hover:shadow-lg transition duration-200 flex flex-col bg-white dark:bg-gray-800"
          >
            {cls.image && (
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {cls.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-1 flex-grow">{cls.description}</p>
            <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
              Price: ${cls.price}
            </p>
            <Link
              to={`/dashboard/student/my-classes/${cls._id}`}
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center transition-colors duration-300"
            >
              Continue
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEnrolledClasses;
