import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth"; // adjust path if needed

const BACKEND = "http://localhost:3000"; // backend base URL

const AllClasses = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // to track enrolled classes
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- helpers ---------------- */
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND}/classes`);
      setClasses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's current enrollments to update UI
  const fetchEnrollments = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(`${BACKEND}/enrollments`, {
        headers: {
          "x-user-email": user.email,
          "x-user-role": user.role,
        },
      });
      setEnrollments(res.data);
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.patch(
      `${BACKEND}/classes/${id}/status`,
      { status },
      {
        headers: {
          "x-user-email": user.email,
          "x-user-role": user.role,
        },
      }
    );
  };

  const enrollClass = (id) =>
    axios.post(
      `${BACKEND}/enroll/${id}`,
      null,
      {
        headers: {
          "x-user-email": user.email,
          "x-user-role": user.role,
        },
      }
    );

  const cancelEnroll = (id) =>
    axios.delete(`${BACKEND}/enroll/${id}`, {
      headers: {
        "x-user-email": user.email,
        "x-user-role": user.role,
      },
    });

  const teacherAdd = (id) =>
    axios.post(
      `${BACKEND}/teacher/add/${id}`,
      null,
      {
        headers: {
          "x-user-email": user.email,
          "x-user-role": user.role,
        },
      }
    );

  const teacherCancel = (id) =>
    axios.delete(`${BACKEND}/teacher/add/${id}`, {
      headers: {
        "x-user-email": user.email,
        "x-user-role": user.role,
      },
    });

  /* ---------------- life‑cycle ---------------- */
  useEffect(() => {
    fetchClasses();
    fetchEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  /* ---------------- reusable action handler ---------------- */
  const handleAction = async (fn) => {
    try {
      setActionLoading(true);
      await fn();
      await fetchClasses();
      await fetchEnrollments();
      setError(null);
    } catch (err) {
      console.error(err);
      alert("Action failed: " + (err.response?.data?.error || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- check if user is enrolled in class ---------------- */
  const isEnrolled = (classId) => {
    return enrollments.some(
      (enroll) => enroll.classId === classId || enroll.classId === classId.toString()
    );
  };

  /* ---------------- UI states ---------------- */
  if (loading) return <p className="text-center mt-10">Loading classes…</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!classes.length) return <p className="text-center">No classes found.</p>;

  /* ---------------- render ---------------- */
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Classes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Image</th>
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Teacher</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id} className="text-center">
                <td className="border px-2 py-2">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="border px-3 py-2">{cls.title}</td>
                <td className="border px-3 py-2">{cls.name}</td>
                <td className="border px-3 py-2">{cls.email}</td>
                <td className="border px-3 py-2">${cls.price}</td>
                <td className="border px-3 py-2 capitalize">{cls.status}</td>

                {/* ---------- role‑specific buttons ---------- */}
                <td className="border px-3 py-2 space-x-2">
                  {/* Admin buttons */}
                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() =>
                          handleAction(() => updateStatus(cls._id, "approved"))
                        }
                        disabled={cls.status === "approved" || actionLoading}
                        className={`px-3 py-1 rounded text-white ${
                          cls.status === "approved"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleAction(() => updateStatus(cls._id, "rejected"))
                        }
                        disabled={cls.status === "rejected" || actionLoading}
                        className={`px-3 py-1 rounded text-white ${
                          cls.status === "rejected"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* Student buttons */}
                  {user?.role === "student" && (
                    <>
                      {!isEnrolled(cls._id) ? (
                        <button
                          onClick={() => handleAction(() => enrollClass(cls._id))}
                          disabled={actionLoading}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Enroll
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(() => cancelEnroll(cls._id))}
                          disabled={actionLoading}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}

                  {/* Teacher buttons */}
                  {user?.role === "teacher" && (
                    <>
                      <button
                        onClick={() => handleAction(() => teacherAdd(cls._id))}
                        disabled={actionLoading}
                        className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => handleAction(() => teacherCancel(cls._id))}
                        disabled={actionLoading}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
