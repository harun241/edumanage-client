import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";

const BACKEND = "http://localhost:3000";

const AllClasses = () => {
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
          "x-user-role": role, // pass current role here
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Update local state to reflect status change
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
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!classes.length) return <p className="text-center">No classes found.</p>;

  return (
    <div>
      <h1 className="font-bold text-center text-4xl mb-6">All Classes</h1>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls._id} className="border rounded p-4 shadow">
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{cls.title}</h3>
            <p>Teacher: {cls.name}</p>
            <p>Price: ${cls.price}</p>
            <p>
              Status:{" "}
              <span
                className={`inline-block px-2 py-1 rounded text-sm ${
                  cls.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : cls.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {cls.status}
              </span>
            </p>

            <div className="mt-4 space-x-2">
              {/* Enroll Now button for students only & approved classes */}
              {role === "student" && cls.status === "approved" && (
                <Link
                  to={`/all-classes/class/${cls._id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enroll Now
                </Link>
              )}

              {/* Approve/Reject buttons for teacher & admin for pending classes */}
              {(role === "admin" || role === "teacher") && cls.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(cls._id, "approved")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(cls._id, "rejected")}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
