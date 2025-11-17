// src/pages/Dashboard/Teacher/MyClass.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND = "https://edumanage-server-rho.vercel.app";

const MyClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`${BACKEND}/classes?email=${user.email}`, {
        headers: {
          "x-user-email": user.email,
          "x-user-role": user.role || "teacher",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setClasses(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching classes:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(`${BACKEND}/classes/${id}`, {
          method: "DELETE",
          headers: {
            "x-user-email": user.email,
            "x-user-role": user.role || "teacher",
          },
        });
        if (res.ok) {
          Swal.fire("Deleted!", "Your class has been deleted.", "success");
          setClasses((prev) => prev.filter((cls) => cls._id !== id));
          if (selectedClass?._id === id) setSelectedClass(null);
        } else {
          const data = await res.json();
          Swal.fire("Error", data.error || "Failed to delete", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete class", "error");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedClass) return;

    const updatedData = {
      title: selectedClass.title,
      description: selectedClass.description,
      image: selectedClass.image,
      price: parseFloat(selectedClass.price),
      availableSeats: parseInt(selectedClass.availableSeats) || 0,
      email: user?.email,
    };

    try {
      const res = await fetch(`${BACKEND}/classes/${selectedClass._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": user?.email,
          "x-user-role": user?.role,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok && data.modifiedCount > 0) {
        Swal.fire("Success", "Class updated successfully!", "success");
        setSelectedClass(null);
        setClasses((prev) =>
          prev.map((cls) =>
            cls._id === selectedClass._id ? { ...cls, ...updatedData } : cls
          )
        );
      } else {
        Swal.fire("Error", data.error || "Failed to update class", "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "An error occurred while updating the class.", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        Loading classes...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        My Classes
      </h2>
      {classes.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-400 transition-colors duration-300">
          No classes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md dark:shadow-lg overflow-hidden flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300"
            >
              {cls.image ? (
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-40 sm:h-48 md:h-56 w-full object-cover"
                />
              ) : (
                <div className="h-40 sm:h-48 md:h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{cls.title}</h3>
                <p className="text-sm sm:text-base mb-1">
                  <span className="font-semibold">Teacher:</span> {user.name}
                </p>
                <p className="text-sm sm:text-base mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-sm sm:text-base mb-1">
                  <span className="font-semibold">Price:</span> ${cls.price}
                </p>
                <p className="text-sm sm:text-base mb-2">{cls.description}</p>
                <p className="text-sm sm:text-base">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      cls.status === "approved"
                        ? "text-green-400 dark:text-green-400"
                        : cls.status === "rejected"
                        ? "text-red-500 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    } transition-colors duration-300`}
                  >
                    {cls.status}
                  </span>
                </p>

                <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-4">
                  <button
                    onClick={() => setSelectedClass(cls)}
                    className="mt-4 px-2 py-3 text-lg font-semibold rounded-xl 
                bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-lg 
                hover:shadow-blue-400/50 transition-all duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="mt-4 px-2 py-3 text-lg font-semibold rounded-xl 
                bg-gradient-to-r from-red-500 to-red-800 text-white shadow-lg 
                hover:shadow-blue-400/50 transition-all duration-300"
                  >
                    Delete
                  </button>
                  <button
                    disabled={cls.status !== "approved"}
                    onClick={() =>
                      navigate(`/dashboard/teacher/my-classes/${cls._id}`)
                    }
                  className={` mt-4 px-2 py-3 text-lg font-semibold rounded-xl 
                bg-gradient-to-r from-green-500 to-green-800 text-white shadow-lg 
                hover:shadow-blue-400/50 transition-all duration-300
  ${
    cls.status === "approved"
      ? ""
      : "bg-gray-400 text-gray-700 shadow-none hover:shadow-none cursor-not-allowed"
  }
`}

                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl w-full max-w-md mx-auto transition-colors duration-300"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Update Class
            </h2>

            <input
              className="w-full mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-colors duration-300"
              value={selectedClass.title}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, title: e.target.value })
              }
              placeholder="Class Title"
              required
            />

            <input
              className="w-full mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-colors duration-300"
              value={selectedClass.image || ""}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, image: e.target.value })
              }
              placeholder="Image URL"
              required
            />

            <input
              type="number"
              min="0"
              className="w-full mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-colors duration-300"
              value={selectedClass.price || ""}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, price: e.target.value })
              }
              placeholder="Price"
              required
            />

            <input
              type="number"
              min="0"
              className="w-full mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-colors duration-300"
              value={selectedClass.availableSeats || 0}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  availableSeats: e.target.value,
                })
              }
              placeholder="Available Seats"
              required
            />

            <textarea
              rows={3}
              className="w-full mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-colors duration-300 resize-none"
              value={selectedClass.description || ""}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, description: e.target.value })
              }
              placeholder="Description"
              required
            />

            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                className="px-3 py-2 sm:py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors duration-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 sm:py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300 text-sm sm:text-base"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyClass;
