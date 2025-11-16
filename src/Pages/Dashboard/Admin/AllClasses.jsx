import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";

const BACKEND = "https://edumanage-server-rho.vercel.app";

const AllClasses = () => {
  const { user } = useAuth();
  const role = user?.role || "";

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" বা "desc"

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

  // Sorting function
  const handleSort = (order) => {
    setSortOrder(order);
    let sorted = [...classes];
    if (order === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setClasses(sorted);
  };

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

      <div className="my-5 flex justify-between items-center">
        <Link to="/">
          <button className="btn bg-sky-400 hover:bg-sky-700 text-white">Back to Home</button>
        </Link>

        {/* Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="border rounded-2xl p-4 shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col justify-between h-[350px]"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{cls.title}</h3>
              <p className="mt-1">Teacher: {cls.name}</p>
              <p>Price: ${cls.price}</p>
              <p>
                Status:{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-sm ${
                    cls.status === "approved"
                      ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                      : cls.status === "rejected"
                      ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100"
                  }`}
                >
                  {cls.status}
                </span>
              </p>
            </div>

            <div className="mt-4 space-x-2">
              {/* Enroll Now button for students only & approved classes */}
              {role === "student" && cls.status === "approved" && (
                <Link
                  to={`/all-classes/class/${cls._id}`}
                  className="inline-block px-4 py-2  text-white rounded btn bg-sky-400 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-700"
                >
                  Enroll Now
                </Link>
              )}

              {/* Approve/Reject buttons for teacher & admin for pending classes */}
              {(role === "admin" || role === "teacher") &&
                cls.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(cls._id, "approved")}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(cls._id, "rejected")}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-10">
        <Link to="/">
          <button className="btn bg-sky-400 hover:bg-sky-700 text-white">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllClasses;
