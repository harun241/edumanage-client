import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";

const BACKEND = "https://edumanage-server-rho.vercel.app";

const ClassRecord = () => {
  const { user } = useAuth();
  const role = user?.role || "";

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND}/classes`);
        setClasses(res.data);
      } catch (err) {
        setError("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BACKEND}/classes/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": role,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setClasses((prevClasses) =>
          prevClasses.map((cls) =>
            cls._id === id ? { ...cls, status } : cls
          )
        );
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500 dark:text-red-400">{error}</p>
    );
  if (!classes.length)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        No classes found.
      </p>
    );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="font-bold text-center text-4xl mb-6 text-gray-900 dark:bg-gray-800 py-2 dark:text-gray-100">
        All Classes
      </h1>
      <div className="my-5">
        <Link to={"/"}>
          <button className="btn bg-sky-400 hover:bg-sky-700 text-white">Back to Home</button>
        </Link>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Teacher</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr
                key={cls._id}
                className="text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <td className="px-4 py-2 border">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">{cls.title}</td>
                <td className="px-4 py-2 border">{cls.name}</td>
                <td className="px-4 py-2 border">${cls.price}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      cls.status === "approved"
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                        : cls.status === "rejected"
                        ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100"
                    }`}
                  >
                    {cls.status}
                  </span>
                </td>
                <td className="px-4 py-2 border space-x-2">
                  {/* Student Enroll */}
                  {role === "student" && cls.status === "approved" && (
                    <Link
                      to={`/all-classes/class/${cls._id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Enroll
                    </Link>
                  )}

                  {/* Approve / Reject */}
                  {(role === "admin" || role === "teacher") &&
                    cls.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(cls._id, "approved")}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(cls._id, "rejected")}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-10">
        <Link to={"/"}>
          <button className="btn bg-sky-400 hover:bg-sky-700 text-white">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ClassRecord;
