import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND = "https://edumanage-server-rho.vercel.app";

const MyClass = () => {
  const { user } = useAuth(); // Assuming user has name, email, role
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (user?.email) {
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BACKEND}/classes/${id}`, {
          method: "DELETE",
          headers: {
            "x-user-email": user.email,
            "x-user-role": user.role || "teacher",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Class has been deleted.", "success");
              setClasses(classes.filter((cls) => cls._id !== id));
            } else {
              Swal.fire("Error", "Failed to delete the class.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the class.", "error");
          });
      }
    });
  };

  const handleUpdate = () => {
    if (
      !selectedClass.title ||
      !selectedClass.price ||
      isNaN(Number(selectedClass.price))
    ) {
      Swal.fire(
        "Validation Error",
        "Please provide a valid title and price.",
        "warning"
      );
      return;
    }

    fetch(`${BACKEND}/classes/${selectedClass._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": user.email,
        "x-user-role": user.role || "teacher",
      },
      body: JSON.stringify({
        ...selectedClass,
        price: Number(selectedClass.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Class info updated.", "success");
          setClasses((prev) =>
            prev.map((cls) => (cls._id === selectedClass._id ? selectedClass : cls))
          );
          setSelectedClass(null);
        } else {
          Swal.fire("Error", "Failed to update the class.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update the class.", "error");
      });
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        Loading classes...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
        My Classes
      </h2>
      {classes.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-400 transition-colors duration-300">
          No classes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md dark:shadow-lg overflow-hidden flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300"
            >
              {cls.image ? (
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-1">{cls.title}</h3>
                <p className="mb-1">
                  <span className="font-semibold">Teacher:</span> {user.name}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Price:</span> ${cls.price}
                </p>
                <p className="mb-2">{cls.description}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      cls.status === "approved"
                        ? "text-green-600 dark:text-green-400"
                        : cls.status === "rejected"
                        ? "text-red-500 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    } transition-colors duration-300`}
                  >
                    {cls.status}
                  </span>
                </p>

                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    onClick={() => setSelectedClass(cls)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded flex-1 transition-colors duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex-1 transition-colors duration-300"
                  >
                    Delete
                  </button>
                  <button
                    disabled={cls.status !== "approved"}
                    onClick={() => navigate(`/dashboard/teacher/my-classes/${cls._id}`)}
                    className={`px-3 py-1 flex-1 text-white rounded transition-colors duration-300 ${
                      cls.status === "approved"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 max-w-full mx-4 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Update Class
            </h2>
            <input
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={selectedClass.title}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, title: e.target.value })
              }
              placeholder="Class Title"
            />
            <input
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed transition-colors duration-300"
              value={user.name}
              disabled
              placeholder="Teacher Name"
            />
            <input
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-not-allowed transition-colors duration-300"
              value={user.email}
              disabled
              placeholder="Teacher Email"
            />
            <input
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              type="number"
              value={selectedClass.price}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, price: e.target.value })
              }
              placeholder="Price"
            />
            <textarea
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={selectedClass.description}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={selectedClass.image}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, image: e.target.value })
              }
              placeholder="Image URL"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClass;
