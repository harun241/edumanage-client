import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ClassDetails = () => {
  const { id } = useParams(); // URL থেকে class id নেওয়া
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ Replace URL with your actual backend endpoint
    fetch(`http://localhost:3000/classes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClassInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching class details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!classInfo) return <p className="text-center text-red-500">Class not found</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">{classInfo.title}</h2>
      <img src={classInfo.image} alt={classInfo.title} className="w-full max-w-md rounded shadow" />
      <p><strong>Instructor:</strong> {classInfo.name}</p>
      <p><strong>Email:</strong> {classInfo.email}</p>
      <p><strong>Price:</strong> ${classInfo.price}</p>
      <p><strong>Description:</strong> {classInfo.description}</p>
      <p><strong>Status:</strong> {classInfo.status}</p>

      {/* 🔜 Class progress & assignment creation buttons here */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">Class Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">📚 Total Enrollments: --</div>
          <div className="bg-green-100 p-4 rounded shadow">📝 Total Assignments: --</div>
          <div className="bg-yellow-100 p-4 rounded shadow">✅ Total Submissions: --</div>
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          ➕ Create Assignment
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
