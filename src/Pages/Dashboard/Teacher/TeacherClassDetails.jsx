import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const BACKEND = "http://localhost:3000";

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
        // submissionsRes assumed to be an array of all submissions for the class
        setSubmissionsCount(submissionsRes.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load class details", "error");
        navigate("/dashboard/teacher/my-class");
      });
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (!classData) return <p className="text-red-600">Class not found.</p>;

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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center">Class Details</h2>
      <img src={image} alt={title} className="w-full h-64 object-cover rounded" />

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p><strong>Instructor:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Enrolled Students:</strong> {enrolled}</p>
        <p className="text-gray-700"><strong>Description:</strong> {description}</p>
      </div>

      {/* Class Progress Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Class Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Enrollment */}
          <div className="bg-blue-100 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-lg font-semibold">Total Enrollment</p>
            <p className="text-3xl font-bold">{enrolled}</p>
          </div>

          {/* Total Assignments */}
          <div className="bg-green-100 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-lg font-semibold">Total Assignments</p>
            <p className="text-3xl font-bold">{assignments.length}</p>
          </div>

          {/* Total Assignment Submissions */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-lg font-semibold">Total Assignment Submissions</p>
            <p className="text-3xl font-bold">{submissionsCount}</p>
          </div>
        </div>

        {/* Create Assignment Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Create Assignment
          </button>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Create Assignment</h3>

            <input
              type="text"
              placeholder="Assignment Title"
              className="w-full mb-3 p-2 border rounded"
              value={newAssignment.title}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <input
              type="date"
              placeholder="Assignment Deadline"
              className="w-full mb-3 p-2 border rounded"
              value={newAssignment.deadline}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, deadline: e.target.value }))
              }
            />

            <textarea
              placeholder="Assignment Description"
              className="w-full mb-3 p-2 border rounded"
              rows={4}
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssignment}
                className="px-4 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-700"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard/teacher/my-class")}
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to My Classes
      </button>
    </div>
  );
};

export default TeacherClassDetails;
