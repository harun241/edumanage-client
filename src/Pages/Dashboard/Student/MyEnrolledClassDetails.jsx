import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/Loader';
import Rating from 'react-rating';
import Swal from 'sweetalert2';

const MyEnrolledClassDetails = () => {
  const { id: classId } = useParams();
  const { user } = useAuth();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [submitStatus, setSubmitStatus] = useState({});
  const [showTERModal, setShowTERModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!classId || !user?.email) {
      setError('Invalid class ID or user not logged in');
      setLoading(false);
      return;
    }

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:3000/assignments?classId=${classId}`);
        if (!res.ok) throw new Error('Failed to fetch assignments');
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        setError(err.message || 'Error loading assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classId, user]);

  const handleChange = (assignmentId, value) => {
    setSubmissions((prev) => ({
      ...prev,
      [assignmentId]: value,
    }));
  };

  const handleSubmit = async (assignmentId) => {
    const submissionText = submissions[assignmentId]?.trim();
    if (!submissionText) return alert('Submission cannot be empty');

    try {
      setSubmitStatus((prev) => ({ ...prev, [assignmentId]: 'loading' }));

      const res = await fetch(`http://localhost:3000/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId,
          classId,
          userEmail: user.email,
          submission: submissionText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit assignment');
      }

      setSubmitStatus((prev) => ({ ...prev, [assignmentId]: 'success' }));
      setSubmissions((prev) => ({ ...prev, [assignmentId]: '' }));
      Swal.fire('Success', 'Submission successful!', 'success');
    } catch (err) {
      setSubmitStatus((prev) => ({ ...prev, [assignmentId]: 'error' }));
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleSendTER = async () => {
    if (!feedbackText || rating === 0) {
      return Swal.fire('Error', 'Please provide feedback and a rating.', 'warning');
    }

    try {
      const res = await fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId,
          email: user.email,
          feedback: feedbackText,
          rating,
        }),
      });

      if (!res.ok) throw new Error('Failed to send feedback');

      setShowTERModal(false);
      setFeedbackText('');
      setRating(0);
      Swal.fire('Success', 'Feedback submitted!', 'success');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;
  if (assignments.length === 0) return <p className="text-center py-6 dark:bg-gray-700">No assignments yet.</p>;

  // Dummy teacher info (replace with real data if available)
  const teacherName = 'harun';
  const teacherEmail = 'harun01.dev@gmail.com';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-10 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">Class Assignments</h2>
        <button
          onClick={() => setShowTERModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Teaching Evaluation Report
        </button>
      </div>

      {/* Teacher & Email - only visible in dark mode */}
      <div className="mb-4 space-y-1">
        <p className="hidden dark:block">
          <strong>Teacher:</strong> {teacherName}
        </p>
        <p className="hidden dark:block">
          <strong>Email:</strong> {teacherEmail}
        </p>
        {/* Pay Button - only dark mode */}
        <button className="hidden dark:inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mt-2">
          Pay
        </button>
      </div>

      {/* Assignment Table */}
      <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Title</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Description</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Deadline</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Submission</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(({ _id, title, description, deadline }) => {
            const status = submitStatus[_id];

            return (
              <tr key={_id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border p-2 border-gray-300 dark:border-gray-700">{title}</td>
                <td className="border p-2 border-gray-300 dark:border-gray-700">{description}</td>
                <td className="border p-2 border-gray-300 dark:border-gray-700">{new Date(deadline).toLocaleDateString()}</td>
                <td className="border p-2 border-gray-300 dark:border-gray-700">
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={submissions[_id] || ''}
                    onChange={(e) => handleChange(_id, e.target.value)}
                    disabled={status === 'success'}
                  />
                </td>
                <td className="border p-2 border-gray-300 dark:border-gray-700 text-center">
                  <button
                    onClick={() => handleSubmit(_id)}
                    disabled={status === 'loading' || status === 'success'}
                    className={`px-4 py-2 rounded text-white ${
                      status === 'success'
                        ? 'bg-green-600 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted' : 'Submit'}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-600 mt-1 text-sm">Failed to submit</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Feedback Modal */}
      {showTERModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative text-gray-900 dark:text-gray-100">
            <h3 className="text-xl font-bold mb-4 text-center">Teaching Evaluation Report</h3>
            <textarea
              className="w-full border p-2 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Write your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={4}
            />
            <div className="mb-2 text-center">
              <p className="mb-2 font-semibold">Your Rating:</p>
              <Rating
                emptySymbol={<span className="text-3xl text-gray-300 cursor-pointer">☆</span>}
                fullSymbol={<span className="text-3xl text-yellow-400 cursor-pointer">★</span>}
                initialRating={rating}
                onChange={(rate) => setRating(rate)}
                fractions={1}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Please select a rating'}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSendTER}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
              <button
                onClick={() => setShowTERModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClassDetails;
