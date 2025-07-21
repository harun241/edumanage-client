import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const BACKEND = "https://edumanage-server-rho.vercel.app";

const TeacherClassDetails = () => {
  const { id } = useParams(); // class id
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissionsCount, setSubmissionsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    deadline: "",
    description: "",
  });

  // Fetch class, assignments and submissions info
  useEffect(() => {
    const fetchClassData = fetch(`${BACKEND}/classes/${id}`).then((res) => res.json());
    const fetchAssignments = fetch(`${BACKEND}/assignments?classId=${id}`).then((res) => res.json());
    const fetchSubmissions = fetch(`${BACKEND}/submissions?classId=${id}`).then((res) => res.json());

    Promise.all([fetchClassData, fetchAssignments, fetchSubmissions])
      .then(([classRes, assignmentsRes, submissionsRes]) => {
        setClassData(classRes);
        setAssignments(assignmentsRes);
        setSubmissionsCount(submissionsRes.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load class details", "error");
        navigate("/dashboard/teacher/my-class");
      });
  }, [id, navigate]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        Loading class details...
      </div>
    );

  if (!classData)
    return (
      <p className="text-center text-red-600 dark:text-red-400 transition-colors duration-300">
        Class not found.
      </p>
    );

  const { title, name, email, price, image, status, description, enrolled = 0 } = classData;

  // Handle assignment form submit
  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.deadline || !newAssignment.description) {
      Swal.fire("Validation Error", "Please fill all fields.", "warning");
      return;
    }

    const assignmentData = {
      ...newAssignment,
      classId: id,
      createdAt: new Date().toISOString(),
    };

    fetch(`${BACKEND}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignmentData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Success", "Assignment created successfully", "success");
        setAssignments((prev) => [...prev, data]);
        setNewAssignment({ title: "", deadline: "", description: "" });
        setShowModal(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to create assignment", "error");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md space-y-6 transition-colors duration-300 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
        Class Details
      </h2>
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded border border-gray-300 dark:border-gray-700 transition-colors duration-300"
      />

      <div className="space-y-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p>
          <strong>Instructor:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              status === "approved"
                ? "text-green-600 dark:text-green-400"
                : status === "rejected"
                ? "text-red-600 dark:text-red-400"
                : "text-yellow-600 dark:text-yellow-400"
            } transition-colors duration-300`}
          >
            {status}
          </span>
        </p>
        <p>
          <strong>Enrolled Students:</strong> {enrolled}
        </p>
        <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <strong>Description:</strong> {description}
        </p>
      </div>

      {/* Class Progress Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          Class Progress
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Enrollment */}
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow flex flex-col items-center transition-colors duration-300">
            <p className="text-lg font-semibold text-gray-900 dark:text-blue-200">Total Enrollment</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-blue-200">{enrolled}</p>
          </div>

          {/* Total Assignments */}
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow flex flex-col items-center transition-colors duration-300">
            <p className="text-lg font-semibold text-gray-900 dark:text-green-200">Total Assignments</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-green-200">{assignments.length}</p>
          </div>

          {/* Total Assignment Submissions */}
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow flex flex-col items-center transition-colors duration-300">
            <p className="text-lg font-semibold text-gray-900 dark:text-yellow-200">
              Total Assignment Submissions
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-yellow-200">{submissionsCount}</p>
          </div>
        </div>

        {/* Create Assignment Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300"
          >
            Create Assignment
          </button>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 flex items-center justify-center z-50 p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Create Assignment
            </h3>

            <input
              type="text"
              placeholder="Assignment Title"
              className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <input
              type="date"
              placeholder="Assignment Deadline"
              className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={newAssignment.deadline}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, deadline: e.target.value }))
              }
            />

            <textarea
              placeholder="Assignment Description"
              className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              rows={4}
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssignment}
                className="px-4 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-700 transition-colors duration-300"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard/teacher/my-class")}
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Back to My Classes
      </button>
    </div>
  );
};

export default TeacherClassDetails;
